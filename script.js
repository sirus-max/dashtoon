async function query(data) {
    const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
            headers: {
                "Accept": "image/png",
                "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}

async function fetchAndDisplayImages() {
    const imageForms = document.querySelectorAll('.imageForm');
    const imageContainer = document.getElementById('imageContainer');
    const fetchButton = document.getElementById('fetchButton');
    // Clear previous images
    imageContainer.innerHTML = '';

    fetchButton.innerHTML = 'Fetching... <i class="fa fa-spinner fa-spin"></i>';

    // Loop through each form
    for (const form of imageForms) {
        // Get the input values for each form
        const input1 = form.querySelector('input[name$="_1"]').value;
        const prompt_for_text_bubble = ". Add the text bubble saying - "
        const input2 = form.querySelector('input[name$="_2"]').value;

        try {
            // Concatenate input values
            const keyword = `${input1} ${prompt_for_text_bubble}  " ${input2} " `;

            // Make API request for each form
            const blobResult = await query({ "inputs": keyword });

            // Display the image
            displayImage(blobResult);
        } catch (error) {
            console.error(`Error for form with inputs ${input1}, ${input2}:`, error);
        }
    }

    // Change the button color after pressing it
    document.getElementById('fetchButton').classList.add('clicked');
}

function displayImage(blob) {
    const imageContainer = document.getElementById('imageContainer');

    // Create new image element
    const image = document.createElement('img');
    image.src = URL.createObjectURL(blob);

    // Append the image to the container
    imageContainer.appendChild(image);
  
}
fetchButton.classList.add('clicked');
// Remove loading icon after fetching
fetchButton.innerHTML = 'Fetch Images';