pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "todoapp"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/HaNGUYEN-96/SIT753-73HD.git'
            }
        }

        stage('Build & Deploy Containers') {
            steps {
                script {
                    // Bring down old containers
                    sh 'docker compose down'

                    // Build and start containers
                    sh 'docker compose up -d --build'
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    // Simple API health check
                    sh 'curl -f http://localhost:5000/todos || exit 1'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed.'
        }
    }
}
// This Jenkinsfile is designed to automate the deployment of a Dockerized application using Docker Compose.