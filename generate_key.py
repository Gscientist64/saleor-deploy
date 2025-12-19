# generate_key.py
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization

# Generate a new RSA key
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
)

# Get the key in PEM format
pem = private_key.private_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PrivateFormat.PKCS8,
    encryption_algorithm=serialization.NoEncryption()
)

# Print the key
print(pem.decode('utf-8'))

# Also save to file
with open('saleor_key.pem', 'wb') as f:
    f.write(pem)
print("\nKey also saved to saleor_key.pem")