import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/SUPABASE_API_KEY in environment");
}

const supabase = createClient(supabaseUrl ?? "", supabaseServiceKey ?? "");

// Setup Nodemailer transporter - MOVED OUTSIDE routes
const mailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email sending function - MOVED BEFORE routes
const sendQuizEmail = async (toEmail, toName) => {
  const mailOptions = {
    from: `"ProstatePath" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "Your ProstatePath Assessment: What's Next",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f0fdf4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">ProstatePath</h1>
              <p style="margin: 8px 0 0; color: #d1fae5; font-size: 14px;">Navigate Your Prostate Health Journey</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #1f2937; font-size: 16px; line-height: 1.6;">
                Hey${toName ? `, <strong>${toName}</strong>` : ""},
              </p>
              
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Thanks for taking the time to complete the assessment — your answers are incredibly valuable.
              </p>
              
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                I spent this week reading through responses from men like you, and one pattern keeps coming up: the gap between knowing you should address your prostate health and actually feeling confident about the path forward.
              </p>
              
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                You know something needs attention. You've done some research. But when it comes to taking action, uncertainty creeps in.
              </p>
              
              <p style="margin: 0 0 30px; color: #374151; font-size: 16px; line-height: 1.6;">
                That's exactly the problem <strong style="color: #10b981;">ProstatePath</strong> is designed to solve.
              </p>
              
              <!-- Divider -->
              <div style="height: 2px; background: linear-gradient(90deg, #10b981 0%, #d1fae5 100%); margin: 30px 0;"></div>
              
              <h2 style="margin: 0 0 20px; color: #10b981; font-size: 20px; font-weight: 600;">What happens next:</h2>
              
              <p style="margin: 0 0 15px; color: #374151; font-size: 16px; line-height: 1.6;">
                Over the next few weeks, I'll be sharing:
              </p>
              
              <table role="presentation" style="width: 100%; margin: 0 0 25px;">
                <tr>
                  <td style="padding: 15px; background-color: #f0fdf4; border-left: 4px solid #10b981; margin-bottom: 10px;">
                    <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.5;">
                      <strong style="color: #10b981;">Behind-the-scenes</strong> of how we're building this (using feedback from men like you)
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background-color: #f0fdf4; border-left: 4px solid #10b981; margin-bottom: 10px;">
                    <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.5;">
                      <strong style="color: #10b981;">The science</strong> behind why generic health advice falls short — and what actually works
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background-color: #f0fdf4; border-left: 4px solid #10b981;">
                    <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.5;">
                      <strong style="color: #10b981;">First look</strong> at how ProstatePath personalizes to YOUR specific health profile and concerns
                    </p>
                  </td>
                </tr>
              </table>
              
              <table role="presentation" style="width: 100%; margin: 0 0 30px;">
                <tr>
                  <td style="padding: 20px; background: linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%); border-radius: 12px; text-align: center;">
                    <p style="margin: 0; color: #065f46; font-size: 16px; line-height: 1.5;">
                      <strong>Then:</strong> Early access launch with exclusive founding member pricing — a special discount reserved only for early supporters like you.
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 30px; color: #374151; font-size: 16px; line-height: 1.6; text-align: center; font-weight: 600;">
                You'll be the first to know when we're ready.
              </p>
              
              <!-- Divider -->
              <div style="height: 2px; background: linear-gradient(90deg, #10b981 0%, #d1fae5 100%); margin: 30px 0;"></div>
              
              <h2 style="margin: 0 0 20px; color: #10b981; font-size: 20px; font-weight: 600;">In the meantime:</h2>
              
              <p style="margin: 0 0 30px; color: #374151; font-size: 16px; line-height: 1.6;">
                If anything came up in your assessment that you want to talk through, just hit reply. This email goes directly to me, and I read every response.
              </p>
              
              <p style="margin: 0 0 8px; color: #374151; font-size: 16px; line-height: 1.6;">
                Building this with you,
              </p>
              
              <p style="margin: 0 0 4px; color: #1f2937; font-size: 17px; font-weight: 600;">
                Antonio Melo
              </p>
              
              <p style="margin: 0; color: #10b981; font-size: 14px;">
                Founder, ProstatePath
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f0fdf4; text-align: center; border-top: 2px solid #d1fae5;">
              <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5; font-style: italic;">
                P.S. - I'm using feedback from men like you to shape every feature. Your input matters more than you think.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
    // Fallback plain text version
    text: `Hey${toName ? ", " + toName : ""},

Thanks for taking the time to complete the assessment — your answers are incredibly valuable.

I spent this week reading through responses from men like you, and one pattern keeps coming up: the gap between knowing you should address your prostate health and actually feeling confident about the path forward.

You know something needs attention. You've done some research. But when it comes to taking action, uncertainty creeps in.

That's exactly the problem ProstatePath is designed to solve.

═══════════════════════════════

What happens next:

Over the next few weeks, I'll be sharing:

- Behind-the-scenes of how we're building this (using feedback from men like you)
- The science behind why generic health advice falls short — and what actually works
- First look at how ProstatePath personalizes to YOUR specific health profile and concerns

Then: Early access launch with exclusive founding member pricing — a special discount reserved only for early supporters like you.

You'll be the first to know when we're ready.

═══════════════════════════════

In the meantime:

If anything came up in your assessment that you want to talk through, just hit reply. This email goes directly to me, and I read every response.

Building this with you,

Antonio Melo
Founder, ProstatePath

P.S. - I'm using feedback from men like you to shape every feature. Your input matters more than you think.`,
  };
  
  try {
    await mailTransporter.sendMail(mailOptions);
    console.log(`Quiz email sent to ${toEmail}`);
  } catch (err) {
    console.error("Failed to send quiz email:", err);
  }
};

app.options("/api/quiz", (req, res) => {
  res.sendStatus(200);
});

app.post("/api/quiz", async (req, res) => {
  try {
    const body = req.body;

    console.log("/api/quiz - incoming request", { bodyType: typeof body });

    if (!body) {
      return res.status(400).json({ error: "Missing body" });
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase not configured");
      return res.status(500).json({ error: "Server misconfiguration" });
    }

    try {
      const { data, error } = await supabase
        .from("client-questionnaire-results")
        .insert([{ payload: body }]);

      if (error) {
        throw error;
      }

      console.log("Quiz saved to Supabase (payload column):", data);
      
      // If user provided both name and email, send them a personalized email
      if (body.email && body.name) {
        sendQuizEmail(body.email, body.name);
      }
      
      return res.status(200).json({ status: "ok", data, note: "saved_to_payload_column" });
    } catch (supabaseErr) {
      console.error("Supabase payload insert failed:", supabaseErr?.message || supabaseErr);

      const msg = (supabaseErr && (supabaseErr.message || String(supabaseErr))) || "Unknown Supabase error";
      
      if (msg.toLowerCase().includes("row-level security") || msg.toLowerCase().includes("violates row-level security")) {
        const guidance = "Supabase row-level security (RLS) is blocking inserts. Add a server-side SUPABASE_SERVICE_ROLE_KEY (Service Role Key) to your .env or configure a Supabase policy to allow inserts. See project README for details.";
        console.error("RLS detected:", msg);

        try {
          const fs = await import("fs");
          const path = await import("path");
          const outPath = path.resolve(process.cwd(), "server", "submissions.log");
          const line = JSON.stringify({ receivedAt: new Date().toISOString(), payload: body, error: msg });
          fs.appendFileSync(outPath, line + "\n", { encoding: "utf8" });
          console.log("Saved submission to local fallback:", outPath);
        } catch (fsErr) {
          console.error("Failed to write local fallback file:", fsErr);
        }

        return res.status(403).json({ status: "rls_blocked", details: msg, guidance });
      }

      try {
        const fs = await import("fs");
        const path = await import("path");
        const outPath = path.resolve(process.cwd(), "server", "submissions.log");
        const line = JSON.stringify({ receivedAt: new Date().toISOString(), payload: body, error: (supabaseErr && supabaseErr.message) || String(supabaseErr) });
        fs.appendFileSync(outPath, line + "\n", { encoding: "utf8" });
        console.log("Saved submission to local fallback:", outPath);
      } catch (fsErr) {
        console.error("Failed to write local fallback file:", fsErr);
      }

      return res.status(200).json({ status: "saved_locally", details: (supabaseErr && supabaseErr.message) || String(supabaseErr) });
    }
  } catch (err) {
    console.error("Error in /api/quiz:", err);
    return res.status(500).json({ error: "Server error", details: (err && err.message) || String(err) });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});