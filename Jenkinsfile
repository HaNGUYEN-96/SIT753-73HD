pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "todoapp"
    }

    stages {
        stage('Checkout') {
            steps {
                // Pull project code from your Git repo
                git branch: 'main', url: 'https://github.com/HaNGUYEN-96/SIT753-73HD.git'
            }
        }

        stage('Build & Deploy Containers') {
            steps {
                script {
                    // Clean up old containers if needed
                    sh 'docker compose down'

                    // Build and run containers
                    sh 'docker compose up -d --build'
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    // Check if backend is running
                    sh 'curl -f http://localhost:5000/todos || exit 1'
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}

// Note: Ensure that Docker and Docker Compose are installed on the Jenkins agent.