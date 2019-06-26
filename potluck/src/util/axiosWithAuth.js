import axios from "axios";

export const axiosWithAuth = () => {
	const token = localStorage.getItem("token");

	return axios.create({
		headers: {
			Authorization: token
		},
		// baseURL: "http://localhost:5000/"
		baseURL: "https://potlucker-planner.herokuapp.com/"
	});
};
