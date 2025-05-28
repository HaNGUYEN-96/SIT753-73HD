pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "todoapp"
        API_KEY = credentials('SONAR_TOKEN') // from Jenkins credentials store
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

        stage('SonarCloud Analysis') {
            steps {
                 withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
                    sh '''
                        # Run SonarScanner in a Docker container
                        docker run --rm \
                          -e SONAR_HOST_URL="https://sonarcloud.io" \
                          -e SONAR_TOKEN="${SONAR_TOKEN}" \
                          -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=HaNGUYEN-96_SIT753-73HD -Dsonar.organization=hanguyen-96" \
                          -v "$(pwd):/usr/src" \
                          sonarsource/sonar-scanner-cli:latest
                    '''
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                script {
                    sh 'docker compose exec backend npm test'  // allow fail for demo
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    sh 'curl -f http://34.129.216.188:5000/todos || exit 1'
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
