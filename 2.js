const project = [{ id: null, projectName: '' }];

for (let i = 0; i < 5; i++) {
	project.id = `${i}`;
}

// for (const { id, projectName } of project) {
// 	console.log(id, projectName);
// }

if (project.id.length > 3) {
	console.log(project.id[2]);
}