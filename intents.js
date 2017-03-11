module.exports = {
	getFiling: function(data) {
		// process request to obtain a specific filing
		console.log('in getFiling');
		var company = data.result.parameters.Companies;
		console.log(company);

	}
};