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
		console.log(response)
		document.querySelector("#temp-output").value = response;
	}).catch(error => console.log(error));
}

function download() {
	// TODO: execute DML and download updated sqlite file
}
