[38;2;131;148;150m   1[0m [38;2;248;248;242mexport async function onRequest(context) {[0m
[38;2;131;148;150m   2[0m [38;2;248;248;242m  const { next } = context;[0m
[38;2;131;148;150m   3[0m [38;2;248;248;242m  const nonce = crypto.randomUUID();[0m
[38;2;131;148;150m   4[0m [38;2;248;248;242m  const response = await next();[0m
[38;2;131;148;150m   5[0m 
[38;2;131;148;150m   6[0m [38;2;248;248;242m  if (response.headers.get("Content-Type")?.includes("text/html")) {[0m
[38;2;131;148;150m   7[0m [38;2;248;248;242m    let text = await response.text();[0m
[38;2;131;148;150m   8[0m [38;2;248;248;242m    text = text.replace(/<script([^>]*)>/gi, `<script nonce="${nonce}"$1>`);[0m
[38;2;131;148;150m   9[0m 
[38;2;131;148;150m  10[0m [38;2;248;248;242m    const newResponse = new Response(text, response);[0m
[38;2;131;148;150m  11[0m [38;2;248;248;242m    newResponse.headers.set([0m
[38;2;131;148;150m  12[0m [38;2;248;248;242m      "Content-Security-Policy",[0m
[38;2;131;148;150m  13[0m [38;2;248;248;242m      `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; frame-src 'self'; frame-ancestors 'none'; base-uri 'self'; upgrade-insecure-requests;`[0m
[38;2;131;148;150m  14[0m [38;2;248;248;242m    );[0m
[38;2;131;148;150m  15[0m [38;2;248;248;242m    return newResponse;[0m
[38;2;131;148;150m  16[0m [38;2;248;248;242m  }[0m
[38;2;131;148;150m  17[0m 
[38;2;131;148;150m  18[0m [38;2;248;248;242m  return response;[0m
[38;2;131;148;150m  19[0m [38;2;248;248;242m}[0m
