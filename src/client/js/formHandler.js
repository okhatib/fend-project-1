import { mock_data } from './mock'

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;

    if(!formText.match(/https?:\/\/.+/)) {
        document.getElementById('results').innerHTML = "Please enter a valid full URL like https://www.google.com";
        return;
    }

    document.getElementById('results').innerHTML = "Loading ...";
    
    Client.getApiKey()
    .then(keyRes => {
        
        const formdata = new FormData();
        formdata.append("key", `${keyRes.key}`);
        formdata.append("url", `${formText}`);
        formdata.append("lang", "en");

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
        .then(meaningcloudRes => meaningcloudRes.json())
        .then(meaningcloudRes => {
            
            document.getElementById('results').innerHTML = BuildUI(meaningcloudRes);

        })
        .catch(error => console.log('error', error));
    });
}

function BuildTableRow(data, type) {
    return `<tr>
                <td>${type}</td>
                <td>${data.text || '-'}</td>
                <td>${data.score_tag}</td>
                <td>${data.agreement}</td>
                <td>${data.confidence}</td>
            </tr>`;
}

function BuildUI(model) {
    let tableBody = BuildTableRow(model, 'Global');

    tableBody += model.sentence_list.map(sentence => {
        let result = BuildTableRow(sentence, 'Sentence');

        result += sentence.segment_list.map(segment => BuildTableRow(segment, 'Segment'));

        return result;
    });

    return `<table class="table"><thead><tr><th>Level</th><th>Text</th><th>Score tag</th><th>Agreement</th><th>Confidence</th></tr></thead><tbody>${tableBody}</tbody></table>`;
}

export { handleSubmit }
