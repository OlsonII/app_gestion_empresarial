pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building Backend..'
                bat 'npm install'
                echo 'Building Frontend...'
                bat 'cd src/presentation/'
                bat 'npm install'
                bat 'cd ../..'
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