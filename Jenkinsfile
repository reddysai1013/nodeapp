pipeline {
    agent any

    environment {
        AWS_REGION = "us-east-1"
        AWS_ACCOUNT_ID = "343218201141"
        IMAGE_NAME = "nodeapp"
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
        FULL_IMAGE_NAME = "${ECR_REGISTRY}/${IMAGE_NAME}:${DOCKER_TAG}"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git url: 'https://github.com/reddysai1013/Pyapp.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${DOCKER_TAG} ."
            }
        }

        stage('Authenticate with AWS ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region ${AWS_REGION} | \
                docker login --username AWS --password-stdin ${ECR_REGISTRY}
                '''
            }
        }

        stage('Tag Docker Image') {
            steps {
                sh "docker tag ${IMAGE_NAME}:${DOCKER_TAG} ${FULL_IMAGE_NAME}"
            }
        }

        stage('Push to AWS ECR') {
            steps {
                sh "docker push ${FULL_IMAGE_NAME}"
            }
        }
    }

    post {
        success {
            echo "Docker image pushed to ECR successfully."
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}
