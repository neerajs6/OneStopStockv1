from marshmallow import Schema, fields

class UserSchema(Schema):
  #id = fields.Int(required=True)
  first_name = fields.Str()
  last_name = fields.Str()
  email = fields.Str()
  username = fields.Str()
  password = fields.Str()

