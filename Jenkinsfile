pipeline {
    agent any

    stages {
        stage('Build') {
            stage('build Frontend'){
                steps {
                  echo 'Building Backend...'
                  bat 'npm install'
                }
            }
            stage('build Backend'){
                steps {
                    echo 'Building Frontend...'
                    bat 'cd src/presentation/'
                    bat 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                bat 'npm run test'
            }
        }
    }
}