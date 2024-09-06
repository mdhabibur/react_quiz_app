export const showLoading = (loading) => {
	return (
		<div className="container alert alert-info">
			<p className="">Loading...</p>
		</div>
	);
};

export const showError = (error) => {
	return (
		<div className="container alert alert-danger">
			<p className="">{error}</p>
		</div>
	);
};

export const showSuccess = (success) => {
	return (
		<div className="container alert alert-success">
			<p className="">{success}</p>
		</div>
	);
};
