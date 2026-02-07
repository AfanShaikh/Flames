      let currentFate = "";
      let p1 = "";
      let p2 = "";

      function calculateFlames() {
        p1 = document.getElementById("name1").value;
        p2 = document.getElementById("name2").value;

        const n1 = p1.toLowerCase().replace(/\s/g, "");
        const n2 = p2.toLowerCase().replace(/\s/g, "");

        if (!n1 || !n2) {
          alert("Please enter both names!");
          return;
        }

        document.getElementById("result").innerHTML = "Reading the stars...";
        document.getElementById("card").classList.add("calculating");
        document.getElementById("shareBtn").style.display = "none";

        setTimeout(() => {
          document.getElementById("card").classList.remove("calculating");

          let a = n1.split("");
          let b = n2.split("");

          a.forEach((char, index) => {
            let bIndex = b.indexOf(char);

            if (bIndex !== -1) {
              a[index] = "";
              b[bIndex] = "";
            }
          });

          const count = (a.join("") + b.join("")).length;

          const flames = [
            "Friends",
            "Lovers",
            "Affection",
            "Marriage",
            "Enemies",
            "Siblings",
          ];

          if (count > 0) {
            let flamesArr = [...flames];
            let index = 0;

            while (flamesArr.length > 1) {
              index = (index + count - 1) % flamesArr.length;
              flamesArr.splice(index, 1);
            }

            currentFate = flamesArr[0];
          } else {
            currentFate = "Soulmates";
          }

          document.getElementById("result").innerHTML = `
                <span style="font-size: 0.8rem; color: #999;">
                    THE VERDICT:
                </span>
                <div class="final-result">
                    ${currentFate.toUpperCase()}
                </div>
            `;

          document.getElementById("shareBtn").style.display = "block";
        }, 1200);
      }


      async function shareResult() {
        const text = `🔥 FLAMES RESULT 🔥
        ${p1} + ${p2} = ${currentFate.toUpperCase()}!
        Check yours now!`;

        if (navigator.share) {
          try {
            await navigator.share({
              title: "FLAMES Result",
              text: text,
            });
          } catch (err) {
            console.log("Share cancelled");
          }
        } else {
          navigator.clipboard.writeText(text);
          alert("Result copied to clipboard!");
        }
      }

      function resetGame() {
        document.getElementById("name1").value = "";
        document.getElementById("name2").value = "";

        document.getElementById("result").innerHTML = "";

        document.getElementById("shareBtn").style.display = "none";
      }