from marshmallow import Schema, fields


class UserDTO(Schema):
    id = fields.Integer(required=False)
    email = fields.Str(required=True)
    password = fields.Str(required=False)
    alias = fields.Str(required=False)
    created = fields.DateTime(required=False)
    updated = fields.DateTime(required=False)
    expiration = fields.DateTime(required=False)


class UserMiniDTO(Schema):
    email = fields.Str(required=True)
    password = fields.Str(required=True)


class UserMicroDTO(Schema):
    email = fields.Str(required=True)
