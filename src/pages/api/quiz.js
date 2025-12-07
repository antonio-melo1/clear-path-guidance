import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
	console.error("Missing SUPABASE_URL or SUPABASE_API_KEY in environment");
	throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
	// Enable CORS
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
	);

	if (req.method === "OPTIONS") {
		res.status(200).end();
		return;
	}

	// Quick request-level logging to help debug why submissions may not arrive
	console.log('/api/quiz - incoming request', {
		method: req.method,
		url: req.url,
		headers: {
			origin: req.headers?.origin,
			host: req.headers?.host,
			contentType: req.headers?.["content-type"],
			referer: req.headers?.referer,
		},
	});

	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const body = req.body;

		// Log body details for debugging (stringify safely & truncate)
		console.log('/api/quiz - raw body typeof:', typeof body);
		try {
			const s = JSON.stringify(body);
			console.log('/api/quiz - raw body (truncated to 2k chars):', s.length > 2000 ? s.slice(0, 2000) + '...[truncated]' : s);
		} catch (e) {
			console.log('/api/quiz - could not stringify body:', e);
		}
		if (!body) {
			return res.status(400).json({ error: "Missing body" });
		}

		// Insert quiz submission to Supabase
		console.log('/api/quiz - inserting payload into Supabase table `client-questionnaire-results`');
		console.log('/api/quiz - payload preview:', body);
		const { data, error } = await supabase
			.from("client-questionnaire-results")
			.insert([body]);

		if (error) {
			console.error("Supabase error:", error);
			return res.status(500).json({ error: "Failed to save submission", details: error.message });
		}

		console.log("Quiz saved to Supabase:", data);
		return res.status(200).json({ status: "ok", data });
	} catch (err) {
		console.error("Error in /api/quiz:", err);
		return res.status(500).json({ error: "Server error", details: err.message });
	}
}
