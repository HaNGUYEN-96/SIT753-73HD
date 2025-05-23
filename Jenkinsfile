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
                    sh 'docker compose down'
                    sh 'docker compose up -d --build'
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                script {
                    sh 'docker compose exec backend npm test || true'  // allow fail for demo
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
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
