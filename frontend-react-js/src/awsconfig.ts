export const cognitoConfig = {
    "AWS_PROJECT_REGION": process.env.REACT_APP_AWS_DEFAULT_REGION,
    "aws_cognito_region": process.env.REACT_APP_AWS_DEFAULT_REGION,
    "aws_user_pools_id": process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
    "aws_user_pools_web_client_id": process.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID,
    "oauth": {},
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    Auth: {
        region: process.env.REACT_APP_AWS_DEFAULT_REGION,
        userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID,
    }
}
