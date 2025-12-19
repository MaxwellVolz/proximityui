pipeline {
    agent any

    stages {
        stage('Health check') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Verify files') {
            steps {
                sh 'test -f proximity.css || exit 1'
                sh 'test -f proximity.js || exit 1'
                sh 'test -d docs || exit 1'
                echo 'All required files present'
            }
        }

        stage('Deploy to Nginx') {
            steps {
                // Deploy the entire repository (includes proximity.css, proximity.js, docs/, examples/)
                sh 'sudo /usr/local/bin/deploy_blog.sh proximityui .'
            }
        }

        stage('Archive site') {
            steps {
                archiveArtifacts artifacts: '**/*.css, **/*.js, docs/**/*.html, examples/**/*.py, CHANGELOG.md, README.md', fingerprint: true
            }
        }
    }

    post {
        success {
            echo '✅ Deployment completed successfully'
        }
        failure {
            echo '❌ Deployment failed'
        }
    }
}