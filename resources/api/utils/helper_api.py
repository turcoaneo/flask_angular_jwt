from flask import Request
from flask_jwt_extended import decode_token


def extract_email_from_request_header(request:Request) -> str:

    token = request.headers['Authorization'].split(None, 1)[1].strip()
    token_payload = decode_token(token)
    return token_payload['sub']