import * as JQuery from "jquery"
const baseurl="http://127.0.0.1:5000"
const smstoken="O7csPy8LWqUqvg3qBrIuPOS33T4olZt63GilMSQxo5dPnEDQTHQcGcZDMRoh"
const smsbase="https://www.bulksmsnigeria.com/api/v1/sms/create"
export default {
    baseurl:baseurl,
	ajax_request(endpoint, request_type, ac_token, rf_token, has_data = false, indata = null) {
		if (has_data == true && indata != null) {
			return JQuery.ajax({
				url: baseurl + endpoint,
				data: JSON.stringify(indata),
				contentType: "application/json",
				type: request_type,
				headers: {
					"Authorization": "Bearer " + ac_token
				}
			})
		} else if (has_data == false && indata == null) {
			return JQuery.ajax({
				url: baseurl + endpoint,
				type: request_type,
				headers: {
					"Authorization": "Bearer " + ac_token
				}
			})
		}
	},
	ajax_request_no_tokens(endpoint, request_type, has_data = false, indata = null) {
		if (has_data == true && indata != null) {
			return JQuery.ajax({
				url: baseurl + endpoint,
				data: JSON.stringify(indata),
				contentType: "application/json",
				type: request_type
			})
		} else if (has_data == false && indata == null) {
			return JQuery.ajax({
				url: baseurl + endpoint,
				type: request_type
			})
		}
	},
	savetolocalstorage(k, v) {
		if (localStorage) {
			localStorage.setItem(k, v)
			console.log("access/refresh token saved")
		} else {
			console.log("local storage is unavailable. save to server or cookie")
		}
	},
	getfromlocalstorage(k) {
		if (localStorage) {
			var v = localStorage.getItem(k)
			return v
		} else {
			console.log("local storage is unavailable. hence, you couldn't have had anything saved in there")
			return null
		}
	},
	splitarr(arr,itemsperpage){
		var totalrows=arr.length;var newarr=[]
		var pages=Math.floor(totalrows / itemsperpage)
        for(var i=0; i<arr.length; i=i+itemsperpage){
			newarr.push(arr.slice(i,i+itemsperpage))
		}
		console.log(newarr)
		return newarr
	},
}