function chooseFile(files) {
	let toDisableButton = (files.length <= 0);

	const button = document.querySelector("#upload-button");
	if (toDisableButton) {
		button.setAttribute("disabled", "disabled");
	} else {
		button.removeAttribute("disabled");
	}
}

function upload() {
	const fileForm = document.querySelector("#file-form");
	const formData = new FormData(fileForm);

	fetch(
		"/files/upload",
		{
			method: "post",
			body: formData
		}
	).then(response => {
		response.json()
			.then(json => {
				console.log(json);
				document.querySelector("#temp-output").value = JSON.stringify(json, null, 2);
			});
	}).catch(error => console.log(error));
}

function download() {
	// TODO: execute DML and download updated sqlite file
}
