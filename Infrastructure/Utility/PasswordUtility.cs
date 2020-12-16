using System;
using System.Security.Cryptography;
using Core.Errors;
using Core.Interfaces;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Infrastructure.Utility
{
  //https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/consumer-apis/password-hashing?view=aspnetcore-3.1
  //https://github.com/dotnet/AspNetCore/blob/master/src/Identity/Extensions.Core/src/PasswordHasher.cs
  //https://www.youtube.com/watch?v=kmHojGMUn0Q

  /*Theory
    Password based key derivation function (pbkdf2)
    Key stretching algorithm - secures against brute force attack by increasing time it takes to test each possible key - designed to be slow
    salt is not kept secret, so it is fine to pair it in database with hashed password
    salt is added to password before hashing to give it more entropy
    entropy is measure of password strength where strength is average munber of guesses it would take to guess a password

    hash functions:
      deterministic - always get same answer
      fast
      irreversible - given 100, you can't know what numbers were added to get 100
      use avalanche effect - two similar inputs give vastly different results
      collision resistant - probabilistically improbable you'd ever get the same answer twice

      note that passwords are never decrypted, they are simply encrypted and compared to encrypted versions
      
      also note that sha-1 is no longer considered a secure hashing algorithm
  */

  public class PasswordUtility : IPasswordUtility
  {
    private int saltSize = 128 / 8;
    private int iterationCount = 4096; //>1000 for security
    private int subkeyLength = 256 / 8;
    private KeyDerivationPrf prf = KeyDerivationPrf.HMACSHA1;

    public string HashPassword(string password)
    {
      // generate salt using random number generator
      byte[] salt = new byte[saltSize];
      using (var rng = RandomNumberGenerator.Create())
      {
        rng.GetBytes(salt);
      }
      // hash password 
      byte[] subkey = KeyDerivation.Pbkdf2(
        password, salt, prf, iterationCount, subkeyLength
      );

      //
      var outputBytes = new byte[1 + saltSize + subkeyLength];
      //set [0]
      outputBytes[0] = 0x00; // format marker
      //add salt to byte array
      Buffer.BlockCopy(salt, 0, outputBytes, 1, saltSize);
      //add subkey to byte array
      Buffer.BlockCopy(subkey, 0, outputBytes, 1 + saltSize, subkeyLength);
      //convert to string
      string hashed = Convert.ToBase64String(outputBytes);
      return hashed;
    }

    public void CheckPassword(string inputPassword, string hashedPassword)
    {
      byte[] hash = Convert.FromBase64String(hashedPassword);

      if (inputPassword == null || hash.Length != 1 + saltSize + subkeyLength)
      {
        throw new ApiError(401, "Incorrect password.");
      }

      //get salt and password from existing
      byte[] salt = new byte[saltSize];
      Buffer.BlockCopy(hash, 1, salt, 0, saltSize);
      byte[] subkey = new byte[subkeyLength];
      Buffer.BlockCopy(hash, 1 + saltSize, subkey, 0, subkeyLength);

      //hash and verify new password
      byte[] inputSubkey = KeyDerivation.Pbkdf2(inputPassword, salt, prf, iterationCount, subkeyLength);

      //needs netstandard2.1+
      if (!CryptographicOperations.FixedTimeEquals(subkey, inputSubkey))
      {
        throw new ApiError(401, "Incorrect password.");
      };
    }
  }
}