                 
pipeline {

    agent {
            label 'memphis-jenkins-big-fleet,'
    }

    stages {
        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_HUB_CREDS_USR', passwordVariable: 'DOCKER_HUB_CREDS_PSW')]) {
                    sh 'docker login -u $DOCKER_HUB_CREDS_USR -p $DOCKER_HUB_CREDS_PSW'
                }
            }
        }

        stage("Build and push image to Docker Hub") {
            steps {
                script {
                    // Read the version from the cloned file
                    def version = readFile './version.conf'
                    echo "Read version from file: ${version}"
                    // Set the version as an environment variable
                    env.versionTag = version.trim()
                }                
                sh """
                docker buildx use builder
                docker buildx build --build-arg NPM_ENV=:prod --push --tag memphisos/superstream-control-plane-ui:${env.versionTag} --tag superstreamlabs/superstream-control-plane-ui:${env.versionTag} --platform linux/amd64,linux/arm64 .
                """
                sh "echo docker image: superstreamlabs/superstream-control-plane-ui:${env.versionTag}"
                
            }
        }

        stage('Push changes prod-us'){   
            steps {
                dir ('devops-repo'){
                  git credentialsId: 'main-github', url: 'git@github.com:superstreamlabs/memphis-devops.git', branch: 'master'
                  sh """ 
                  yq e '.spec.template.spec.containers[0].image = "superstreamlabs/superstream-control-plane-ui:${env.versionTag}"' -i Deployments/superstream-prod-cp-ui/deployment.yaml
                  """
                    withCredentials([sshUserPrivateKey(credentialsId: 'main-github', keyFileVariable: 'SSH_KEY')]) { 
                        sh """
                        git config --global user.email "jenkins@memphis.dev"
                        git config --global user.name "Jenkins"
                        git add Deployments/superstream-prod-cp-ui/deployment.yaml
                        git diff-index --quiet HEAD || git commit -m "release ${env.versionTag}"
                        export GIT_SSH_COMMAND='ssh -i $SSH_KEY'                            
                        git pull origin master --rebase
                        git push origin master  
                        """
                    }
                }
                sh """
                gcloud container clusters get-credentials memphis-mgmt-gke --region europe-west3 --project memphis-k8s-mgmt
                kubectl config set-context --current --namespace=argocd
                argocd  login argocd.mgmt.memphis-gcp.dev --core=true
                argocd  --server=argocd.mgmt.memphis-gcp.dev app sync superstream-prod-cp-ui
                argocd  --server=argocd.mgmt.memphis-gcp.dev app wait superstream-prod-cp-ui --timeout 600
                """ 

                sh "rm -rf devops-repo || true"                
            }        
        }
        stage('Install gh + jq') {
            steps {  
                sh """
                    sudo dnf config-manager --add-repo https://cli.github.com/packages/rpm/gh-cli.repo -y
                    sudo dnf install gh -y
                    sudo dnf install jq -y
                """
            }
        }

        stage('checkout to version branch'){
            steps {
                withCredentials([sshUserPrivateKey(keyFileVariable:'check',credentialsId: 'main-github')]) {
                    sh """
                        git reset --hard origin/master
                        GIT_SSH_COMMAND='ssh -i $check'  git checkout -b ${env.versionTag}
                        GIT_SSH_COMMAND='ssh -i $check' git push --set-upstream origin ${env.versionTag}
                    """
                }
            }
        }

        stage('Install gh + create new release'){
            steps {
            withCredentials([string(credentialsId: 'gh_token', variable: 'GH_TOKEN')]) {
                    sh """
                        gh release create v${env.versionTag} --generate-notes
                    """
                }
            }
        } 

    }
    post {
        always {
            cleanWs()
        }
        success {
            notifySuccessful()
        }
        failure {
            notifyFailed()
        }
    }
}

def notifySuccessful() {
    emailext (
        subject: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
        body: """SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':
        Check console output and connection attributes at ${env.BUILD_URL}""",
        to: 'idan@memphis.dev'
    )
}
def notifyFailed() {
    emailext (
        subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
        body: """FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':
        Check console output at ${env.BUILD_URL}""",
        to: 'idan@memphis.dev'
    )
}
