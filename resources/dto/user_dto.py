from marshmallow import Schema, fields


class UserDTO(Schema):
    id = fields.Integer(required=False)
    name = fields.Str(required=True)


class UserArgsDTO(Schema):
    name = fields.Str(required=True)
