let imageUrl = "";  // Global variable to store image URL for downloading

        async function barcode() {
            const data = document.getElementById("inputvalue").value;

            if (!data) {
                alert("Please enter the input");
                return;
            }

            try {
                // Fetch the barcode image from the server
                const response = await fetch(`/barcode/${encodeURIComponent(data)}`);
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                // Convert the response to a blob
                const blob = await response.blob();

                // Create a URL for the blob and set it as the src of the image
                imageUrl = URL.createObjectURL(blob);
                document.getElementById("image").src = imageUrl;

                // Make the download button visible
                document.getElementById("downloadButton").style.display = "inline-block";

            } catch (error) {
                console.error("Error fetching barcode:", error);
                alert("Failed to fetch barcode. Please check the console for more details.");
            }
        }

        function download() {
            if (imageUrl) {
                const a = document.createElement("a");
                a.href = imageUrl;
                a.download = "barcode.png";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                alert("No barcode available to download.");
            }
        }