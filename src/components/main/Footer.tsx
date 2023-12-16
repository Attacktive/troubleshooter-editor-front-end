import React from "react";
import github from "images/github.svg";

export default function Footer() {
	return (
		<footer id="footer" className="mt-2">
			<a
				href="https://github.com/Attacktive/troubleshooter-editor"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span>
					<img src={github} alt="to the GitHub repository" width={48} height={48}/>
				</span>
			</a>
		</footer>
	);
}
