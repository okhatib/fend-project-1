function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;

    Client.getApiKey()
    .then(function(keyRes) {
        
        const formdata = new FormData();
        formdata.append("key", `${keyRes.key}`);
        formdata.append("txt", `${formText}`);
        formdata.append("lang", "en");

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
        .then(meaningcloudRes => meaningcloudRes.json())
        .then(meaningcloudRes => {
            document.getElementById('results').innerHTML = JSON.stringify(meaningcloudRes)
        })
        .catch(error => console.log('error', error));
    });
}

export { handleSubmit }
