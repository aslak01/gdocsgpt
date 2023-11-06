<script lang="ts">
  import bcrypt from "bcrypt";

  export function hashPw(pw: string, saltRounds = 10): string | null {
    let result = null;
    bcrypt.hash(pw, saltRounds, function (err, hash) {
      if (err) {
        console.error(err);
      }
      result = hash;
    });

    return result;
  }
  const test = "hei hei hei";
  const hashed = hashPw(test);
</script>

{test}
<div>{hashed}</div>
