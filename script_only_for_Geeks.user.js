// ==UserScript==
// @name            TUD AutoLogin with generating the 2FA
// @namespace       https://tud-autologin.spyfly.xyz/
// @version         0.4.4
// @description     Stop wasting your time entering login credentials or pressing useless buttons! The script allows you to fully automate the entry of all login details, including two-factor authentication. (updated from spyfly)
// @description:de  Verschwende keine Zeit mehr mit dem Eingeben von Anmeldedaten oder dem Drücken sinnloser Tasten! Mit dem Skript kann man die Eingabe aller Anmeldedaten, einschließlich der Zwei-Faktor-Authentifizierung, vollständig automatisieren.
// @description:ru  Перестань тратить время на ввод данных или кликанье бесполезных кнопок! Скрипт позволяет полностью автоматизировать ввод всех данных, включая двухфакторную аутентификацию.
// @author          FurTactics
// @icon            https://upload.wikimedia.org/wikipedia/commons/a/a3/Logo_TU_Dresden_small.svg
// @match           https://bildungsportal.sachsen.de/*
// @match           https://idp2.tu-dresden.de/*
// @match           https://jexam.inf.tu-dresden.de/*
// @match           https://selma.tu-dresden.de/*
// @match           https://exam.zih.tu-dresden.de/*
// @match           https://exam2.zih.tu-dresden.de/*
// @match           https://exam3.zih.tu-dresden.de/*
// @match           https://qis.dez.tu-dresden.de/qisserver/*
// @match           https://msx.tu-dresden.de/owa/auth/logon*
// @match           https://lskonline.tu-dresden.de/lskonline/de/102.0.1*
// @match           https://idp.tu-dresden.de/idp*
// @match           https://tud-autologin.spyfly.xyz/configuration/
// @match           https://tex.zih.tu-dresden.de/*
// @match           https://tud.uni-leipzig.de/moodle2/*
// @match           https://artemis-app.inf.tu-dresden.de/*
// @supportURL      https://github.com/FurTactics/TUD-AutoLogin/issues
// @downloadURL     https://raw.githubusercontent.com/FurTactics/TUD-AutoLogin/master/script_only_for_Geeks.user.js
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_notification
// @grant           GM_registerMenuCommand
// @grant           GM_listValues
// @grant           GM_deleteValue
// ==/UserScript==

'use strict'; (function (G) {
    function r(d, b, c) {
        var h = 0, a = [], f = 0, g, m, k, e, l, p, q, t, w = !1, n = [], u = [], v, r = !1; c = c || {}; g = c.encoding || "UTF8"; v = c.numRounds || 1; if (v !== parseInt(v, 10) || 1 > v) throw Error("numRounds must a integer >= 1"); if ("SHA-1" === d) l = 512, p = z, q = H, e = 160, t = function (a) { return a.slice() }; else throw Error("Chosen SHA variant is not supported"); k = A(b, g); m = x(d); this.setHMACKey = function (a, f, b) {
            var c; if (!0 === w) throw Error("HMAC key already set"); if (!0 === r) throw Error("Cannot set HMAC key after calling update");
            g = (b || {}).encoding || "UTF8"; f = A(f, g)(a); a = f.binLen; f = f.value; c = l >>> 3; b = c / 4 - 1; if (c < a / 8) { for (f = q(f, a, 0, x(d), e); f.length <= b;)f.push(0); f[b] &= 4294967040 } else if (c > a / 8) { for (; f.length <= b;)f.push(0); f[b] &= 4294967040 } for (a = 0; a <= b; a += 1)n[a] = f[a] ^ 909522486, u[a] = f[a] ^ 1549556828; m = p(n, m); h = l; w = !0
        }; this.update = function (b) { var e, g, c, d = 0, q = l >>> 5; e = k(b, a, f); b = e.binLen; g = e.value; e = b >>> 5; for (c = 0; c < e; c += q)d + l <= b && (m = p(g.slice(c, c + q), m), d += l); h += d; a = g.slice(d >>> 5); f = b % l; r = !0 }; this.getHash = function (b, g) {
            var c, k, l, p; if (!0 ===
                w) throw Error("Cannot call getHash after setting HMAC key"); l = B(g); switch (b) { case "HEX": c = function (a) { return C(a, e, l) }; break; case "B64": c = function (a) { return D(a, e, l) }; break; case "BYTES": c = function (a) { return E(a, e) }; break; case "ARRAYBUFFER": try { k = new ArrayBuffer(0) } catch (I) { throw Error("ARRAYBUFFER not supported by this environment"); } c = function (a) { return F(a, e) }; break; default: throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER"); }p = q(a.slice(), f, h, t(m), e); for (k = 1; k < v; k += 1)p = q(p, e, 0, x(d), e);
            return c(p)
        }; this.getHMAC = function (b, g) {
            var c, k, n, r; if (!1 === w) throw Error("Cannot call getHMAC without first setting HMAC key"); n = B(g); switch (b) {
                case "HEX": c = function (a) { return C(a, e, n) }; break; case "B64": c = function (a) { return D(a, e, n) }; break; case "BYTES": c = function (a) { return E(a, e) }; break; case "ARRAYBUFFER": try { c = new ArrayBuffer(0) } catch (I) { throw Error("ARRAYBUFFER not supported by this environment"); } c = function (a) { return F(a, e) }; break; default: throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");
            }k = q(a.slice(), f, h, t(m), e); r = p(u, x(d)); r = q(k, e, l, r, e); return c(r)
        }
    } function C(d, b, c) { var h = ""; b /= 8; var a, f; for (a = 0; a < b; a += 1)f = d[a >>> 2] >>> 8 * (3 + a % 4 * -1), h += "0123456789abcdef".charAt(f >>> 4 & 15) + "0123456789abcdef".charAt(f & 15); return c.outputUpper ? h.toUpperCase() : h } function D(d, b, c) {
        var h = "", a = b / 8, f, g, m; for (f = 0; f < a; f += 3)for (g = f + 1 < a ? d[f + 1 >>> 2] : 0, m = f + 2 < a ? d[f + 2 >>> 2] : 0, m = (d[f >>> 2] >>> 8 * (3 + f % 4 * -1) & 255) << 16 | (g >>> 8 * (3 + (f + 1) % 4 * -1) & 255) << 8 | m >>> 8 * (3 + (f + 2) % 4 * -1) & 255, g = 0; 4 > g; g += 1)8 * f + 6 * g <= b ? h += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(m >>>
            6 * (3 - g) & 63) : h += c.b64Pad; return h
    } function E(d, b) { var c = "", h = b / 8, a, f; for (a = 0; a < h; a += 1)f = d[a >>> 2] >>> 8 * (3 + a % 4 * -1) & 255, c += String.fromCharCode(f); return c } function F(d, b) { var c = b / 8, h, a = new ArrayBuffer(c), f; f = new Uint8Array(a); for (h = 0; h < c; h += 1)f[h] = d[h >>> 2] >>> 8 * (3 + h % 4 * -1) & 255; return a } function B(d) {
        var b = { outputUpper: !1, b64Pad: "=", shakeLen: -1 }; d = d || {}; b.outputUpper = d.outputUpper || !1; !0 === d.hasOwnProperty("b64Pad") && (b.b64Pad = d.b64Pad); if ("boolean" !== typeof b.outputUpper) throw Error("Invalid outputUpper formatting option");
        if ("string" !== typeof b.b64Pad) throw Error("Invalid b64Pad formatting option"); return b
    } function A(d, b) {
        var c; switch (b) { case "UTF8": case "UTF16BE": case "UTF16LE": break; default: throw Error("encoding must be UTF8, UTF16BE, or UTF16LE"); }switch (d) {
            case "HEX": c = function (b, a, f) {
                var g = b.length, c, d, e, l, p; if (0 !== g % 2) throw Error("String of HEX type must be in byte increments"); a = a || [0]; f = f || 0; p = f >>> 3; for (c = 0; c < g; c += 2) {
                    d = parseInt(b.substr(c, 2), 16); if (isNaN(d)) throw Error("String of HEX type contains invalid characters");
                    l = (c >>> 1) + p; for (e = l >>> 2; a.length <= e;)a.push(0); a[e] |= d << 8 * (3 + l % 4 * -1)
                } return { value: a, binLen: 4 * g + f }
            }; break; case "TEXT": c = function (c, a, f) {
                var g, d, k = 0, e, l, p, q, t, n; a = a || [0]; f = f || 0; p = f >>> 3; if ("UTF8" === b) for (n = 3, e = 0; e < c.length; e += 1)for (g = c.charCodeAt(e), d = [], 128 > g ? d.push(g) : 2048 > g ? (d.push(192 | g >>> 6), d.push(128 | g & 63)) : 55296 > g || 57344 <= g ? d.push(224 | g >>> 12, 128 | g >>> 6 & 63, 128 | g & 63) : (e += 1, g = 65536 + ((g & 1023) << 10 | c.charCodeAt(e) & 1023), d.push(240 | g >>> 18, 128 | g >>> 12 & 63, 128 | g >>> 6 & 63, 128 | g & 63)), l = 0; l < d.length; l += 1) {
                    t = k +
                        p; for (q = t >>> 2; a.length <= q;)a.push(0); a[q] |= d[l] << 8 * (n + t % 4 * -1); k += 1
                } else if ("UTF16BE" === b || "UTF16LE" === b) for (n = 2, d = "UTF16LE" === b && !0 || "UTF16LE" !== b && !1, e = 0; e < c.length; e += 1) { g = c.charCodeAt(e); !0 === d && (l = g & 255, g = l << 8 | g >>> 8); t = k + p; for (q = t >>> 2; a.length <= q;)a.push(0); a[q] |= g << 8 * (n + t % 4 * -1); k += 2 } return { value: a, binLen: 8 * k + f }
            }; break; case "B64": c = function (b, a, f) {
                var c = 0, d, k, e, l, p, q, n; if (-1 === b.search(/^[a-zA-Z0-9=+\/]+$/)) throw Error("Invalid character in base-64 string"); k = b.indexOf("="); b = b.replace(/\=/g,
                    ""); if (-1 !== k && k < b.length) throw Error("Invalid '=' found in base-64 string"); a = a || [0]; f = f || 0; q = f >>> 3; for (k = 0; k < b.length; k += 4) { p = b.substr(k, 4); for (e = l = 0; e < p.length; e += 1)d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(p[e]), l |= d << 18 - 6 * e; for (e = 0; e < p.length - 1; e += 1) { n = c + q; for (d = n >>> 2; a.length <= d;)a.push(0); a[d] |= (l >>> 16 - 8 * e & 255) << 8 * (3 + n % 4 * -1); c += 1 } } return { value: a, binLen: 8 * c + f }
            }; break; case "BYTES": c = function (b, a, c) {
                var d, m, k, e, l; a = a || [0]; c = c || 0; k = c >>> 3; for (m = 0; m < b.length; m +=
                    1)d = b.charCodeAt(m), l = m + k, e = l >>> 2, a.length <= e && a.push(0), a[e] |= d << 8 * (3 + l % 4 * -1); return { value: a, binLen: 8 * b.length + c }
            }; break; case "ARRAYBUFFER": try { c = new ArrayBuffer(0) } catch (h) { throw Error("ARRAYBUFFER not supported by this environment"); } c = function (b, a, c) { var d, m, k, e, l; a = a || [0]; c = c || 0; m = c >>> 3; l = new Uint8Array(b); for (d = 0; d < b.byteLength; d += 1)e = d + m, k = e >>> 2, a.length <= k && a.push(0), a[k] |= l[d] << 8 * (3 + e % 4 * -1); return { value: a, binLen: 8 * b.byteLength + c } }; break; default: throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");
        }return c
    } function n(d, b) { return d << b | d >>> 32 - b } function u(d, b) { var c = (d & 65535) + (b & 65535); return ((d >>> 16) + (b >>> 16) + (c >>> 16) & 65535) << 16 | c & 65535 } function y(d, b, c, h, a) { var f = (d & 65535) + (b & 65535) + (c & 65535) + (h & 65535) + (a & 65535); return ((d >>> 16) + (b >>> 16) + (c >>> 16) + (h >>> 16) + (a >>> 16) + (f >>> 16) & 65535) << 16 | f & 65535 } function x(d) { var b = []; if ("SHA-1" === d) b = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]; else throw Error("No SHA variants supported"); return b } function z(d, b) {
        var c = [], h, a, f, g, m, k, e; h = b[0]; a = b[1];
        f = b[2]; g = b[3]; m = b[4]; for (e = 0; 80 > e; e += 1)c[e] = 16 > e ? d[e] : n(c[e - 3] ^ c[e - 8] ^ c[e - 14] ^ c[e - 16], 1), k = 20 > e ? y(n(h, 5), a & f ^ ~a & g, m, 1518500249, c[e]) : 40 > e ? y(n(h, 5), a ^ f ^ g, m, 1859775393, c[e]) : 60 > e ? y(n(h, 5), a & f ^ a & g ^ f & g, m, 2400959708, c[e]) : y(n(h, 5), a ^ f ^ g, m, 3395469782, c[e]), m = g, g = f, f = n(a, 30), a = h, h = k; b[0] = u(h, b[0]); b[1] = u(a, b[1]); b[2] = u(f, b[2]); b[3] = u(g, b[3]); b[4] = u(m, b[4]); return b
    } function H(d, b, c, h) {
        var a; for (a = (b + 65 >>> 9 << 4) + 15; d.length <= a;)d.push(0); d[b >>> 5] |= 128 << 24 - b % 32; b += c; d[a] = b & 4294967295; d[a - 1] = b / 4294967296 | 0;
        b = d.length; for (a = 0; a < b; a += 16)h = z(d.slice(a, a + 16), h); return h
    } "function" === typeof define && define.amd ? define(function () { return r }) : "undefined" !== typeof exports ? ("undefined" !== typeof module && module.exports && (module.exports = r), exports = r) : G.jsSHA = r
})(this);

(async function () {
    'use strict';
    //Load Configuration values
    var tud = {
        username: "",
        password: "",
        secret: ""
    }
    if (GM_getValue("tud_creds") != undefined) {
        tud = GM_getValue("tud_creds");
    }

    // Code starts here
    const isConfigPage = (window.location.host == "tud-autologin.spyfly.xyz");
    const isOpalLoginPage = (window.location.host == "bildungsportal.sachsen.de");
    const isTudExamLoginPage = (window.location.host.startsWith("exam") && window.location.host.endsWith(".zih.tu-dresden.de"));
    const isTudLoginPage = (window.location.host == "idp2.tu-dresden.de");
    const isJExam = (window.location.host == "jexam.inf.tu-dresden.de");
    const isSelma = (window.location.host == "selma.tu-dresden.de");
    const isQisServer = (window.location.host == "qis.dez.tu-dresden.de");
    const isOWA = (window.location.host == "msx.tu-dresden.de");
    const isLskOnline = (window.location.host == "lskonline.tu-dresden.de");
    const isTudIdp = (window.location.host == "idp.tu-dresden.de");
    const isShareLatex = (window.location.host == "tex.zih.tu-dresden.de");
    const isMoodle = (window.location.host == "tud.uni-leipzig.de");

    const credentialsAvailable = (tud.username.length > 0 && tud.password.length > 0);
    const secretIsAvailable = tud.secret.length > 5;
    const stat = GM_getValue("stats");
    const menu_command_id_1 = GM_registerMenuCommand("You saved " + stat + " clicks 👍", function (event) { console.clear; console.log("You are awesome. " + stat + " clicks is more than " + Math.round(stat / 60) + " minutes. If you want, you can support me on GitHub https://github.com/FurTactics/TUD-AutoLogin/") }, { autoClose: false });
    const menu_command_id_2 = GM_registerMenuCommand("Delete all your saved data", function (event) {
        const keys = GM_listValues();
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            GM_deleteValue(key);
        }
        GM_notification({
            text: "Your data has been successfully deleted\nClick to visit configuration website",
            title: "TUD Autologin",
            url: 'https://tud-autologin.spyfly.xyz/configuration/#configuration',
            silent: true,
            timeout: 10000,
            onclick: (event) => { }
        });
    }, { autoClose: true });


    if (isConfigPage) {
        // Change all links to GitHub on a config page
        var links = [document.querySelectorAll("a")[0], document.querySelectorAll("a")[2], document.querySelectorAll("a")[4]];
        for (var i = 0; i < links.length; i++) {
            links[i].getAttribute("href");
            links[i].setAttribute("href", "https://github.com/FurTactics/TUD-AutoLogin/");
            links[i].addEventListener("click", function (event) {
                event.preventDefault(); // Prevent the default action
                window.open("https://github.com/FurTactics/TUD-AutoLogin/", "_blank"); // Open the link in a new tab
            });
        }

        // Add GitHub link in footer
        const footer = document.querySelector('.site-footer');
        if (footer) {
            const spyflyLink = footer.querySelector('a[href="https://github.com/spyfly"]');
            if (spyflyLink) {
                // Create and insert "and" text node
                const andText = document.createTextNode(' and modified by ');
                spyflyLink.parentNode.insertBefore(andText, spyflyLink.nextSibling);
                // create link
                const newLink = document.createElement('a');
                newLink.href = 'https://github.com/FurTactics/';
                newLink.textContent = 'FurTactics';
                // Insert the new link after the spyfly link
                andText.parentNode.insertBefore(newLink, andText.nextSibling);
            }
        }

        // Test notification
        const p_6 = document.querySelectorAll("p")[6];
        p_6.textContent = "Make sure, that you can receive notifications from browser.";

        const p_before_button = document.createElement('p');
        p_before_button.textContent = 'Here is a test.';
        p_6.parentNode.insertBefore(p_before_button, p_6.nextSibling);

        const button = document.createElement('button');
        button.textContent = 'Test';
        button.addEventListener('click', () => {
            GM_notification({
                title: 'Test Notification',
                text: 'This is a test notification from the script.\nYou will receive such notifications if an incorrect 2FA code is entered.',
                timeout: 10000
            });
        });
        p_before_button.parentNode.insertBefore(button, p_before_button.nextSibling);

        const p_after_button = document.createElement('p');
        p_after_button.textContent = 'If you haven\'t received a notification, try turning off do not disturb mode.';
        button.parentNode.insertBefore(p_after_button, button.nextSibling);

        const p_congratulation = document.createElement('p');
        p_congratulation.textContent = 'Otherwise, welcome to the world of saved time 😉';
        p_after_button.parentNode.insertBefore(p_congratulation, p_after_button.nextSibling);

        document.getElementById("notinstalled").remove();
        document.getElementById("username").value = tud.username;
        document.getElementById("password").value = tud.password;

        document.getElementById("save").addEventListener("click", function () {
            let secretInput = prompt("Enter your secret code with 32 letters and digits from QR-Code");
            GM_setValue("tud_creds", {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                secret: secretInput
            });
            GM_setValue("stats", 0);
            alert("Is your code from app: " + getOTP(secretInput) + "?\nIf not, please check your token");
            alert("Configuration updated!");
        });
    } else if (isOpalLoginPage || isTudExamLoginPage) {
        const mainPageLoginBtn = document.querySelector("button[name=shibLogin]");
        const contentPageLoginBtn = document.querySelector('.btn-sm[title="Login"]');
        var loginSelector = document.querySelector("select[name$='wayfselection']");
        var loginIndex;

        //Do we have to perform login action in the first place?
        if (mainPageLoginBtn || contentPageLoginBtn) {
            if (contentPageLoginBtn) {

                contentPageLoginBtn.click();
                GM_setValue("stats", GM_getValue('stats') + 1);
                // Wait for Login Prompt to appear
                while (loginSelector == null) {
                    loginSelector = document.querySelector("select[name$='wayfselection']");
                    await sleep(100);
                }
            }

            // Select TU-Dresden as Login Option
            for (const option of loginSelector.options) {
                if (option.text == "TU Dresden") {
                    loginIndex = option.index;
                    break;
                }
            }
            loginSelector.selectedIndex = loginIndex;

            // Press Login Button
            document.querySelector("button[name$='shibLogin']").click();
            GM_setValue("stats", GM_getValue('stats') + 1);
        }
    }
    else if (isTudLoginPage || isTudIdp) {
        // Add dark theme
        darkThemeIDP();
        // We are on the TUD I2DP Page
        const hasLoginField = (document.getElementById("username") != undefined);
        const hasSecretField = (document.getElementById("fudis_otp_input") != undefined);

        if (hasLoginField) {
            // Try to fill in credentials
            document.getElementById("username").value = tud.username;
            document.getElementById("password").value = tud.password;
            if (credentialsAvailable) {
                document.getElementsByName("_eventId_proceed")[0].click();
                GM_setValue("isSecretEntered", false);
                GM_setValue("stats", GM_getValue("stats") + 1);
            }
        }
        if (hasSecretField) {
            enterSecret();
        }
    }
    else if (isJExam) {
        // AutoLogin for JExam 5
        if (window.location.pathname == "/") {
            window.location = "https://jexam.inf.tu-dresden.de/de.jexam.web.v5/"
        } else if (window.location.pathname == "/de.jexam.web.v5/spring/welcome") {
            // Try to fill in credentials
            document.getElementById("username").value = tud.username;
            document.getElementById("password").value = tud.password;
            if (credentialsAvailable) {
                document.getElementsByClassName("submit")[0].click();
                GM_setValue("stats", GM_getValue('stats') + 1);
            }
        }
    }
    else if (isSelma) {
        // AutoLogin for selma
        if (document.getElementById("field_user") != undefined) {
            document.getElementById("field_user").value = tud.username;
            document.getElementById("field_pass").value = tud.password;
            if (credentialsAvailable) {
                document.getElementById("logIn_btn").click();
                GM_setValue("stats", GM_getValue('stats') + 1);
            }
        }
    }
    else if (isMoodle) {
        // AutoLogin for Moodle
        if (window.location.pathname == "/moodle2/login/index.php") {
            // Check if we are on the login page
            document.querySelector('[href="https://tud.uni-leipzig.de/moodle2/auth/shibboleth/index.php"]').click();
            GM_setValue("stats", GM_getValue('stats') + 1);
        } else {
            //Go to the login page if we need to login
            const loginBtn = document.querySelector('[href="https://tud.uni-leipzig.de/moodle2/login/index.php"]');
            if (loginBtn) {
                loginBtn.click();
                GM_setValue("stats", GM_getValue('stats') + 1);
            }
        }
    }
    else if (isQisServer) {
        //AutoLogin for QISServer
        if (document.getElementsByClassName("loginuser").length >= 1) {
            document.getElementsByClassName("loginuser")[0].value = tud.username;
            document.getElementsByClassName("loginpass")[0].value = tud.password;
            if (credentialsAvailable) {
                document.getElementsByClassName("submit")[0].click();
                GM_setValue("stats", GM_getValue('stats') + 1);
            }
        }
    }
    else if (isOWA) {
        //AutoLogin for OWA
        document.getElementById('username').value = tud.username;
        document.getElementById('password').value = tud.password;
        if (credentialsAvailable) {
            document.getElementsByClassName("signinbutton")[0].click();
            GM_setValue("stats", GM_getValue('stats') + 1);
        }
    }
    else if (isLskOnline) {
        //AutoLogin for LSKOnline
        document.getElementsByName('j_username')[0].value = tud.username;
        document.getElementsByName('j_password')[0].value = tud.password;
        if (credentialsAvailable) {
            document.getElementsByName('submit')[0].click();
            GM_setValue("stats", GM_getValue('stats') + 1);
        }
    }
    else if (isShareLatex) {
        //AutoLogin for ShareLaTeX
        if (window.location.pathname == "/saml/login") {
            // Check if we are on the login page
            document.querySelector('[href="/saml/login/go"]').click();
            GM_setValue("stats", GM_getValue('stats') + 1);
        } else {
            //Go to the login page if we need to login
            const loginBtn = document.querySelector('[href="/login"]');
            if (loginBtn) {
                loginBtn.click();
                GM_setValue("stats", GM_getValue('stats') + 1);
            }
        }
    }

    function enterSecret(pinInput) {
        document.getElementById("fudis_otp_input").focus();
        var otp_input = getOTP(tud.secret);
        sleep(200);
        if (!GM_getValue("isSecretEntered")) {
            document.getElementById("fudis_otp_input").value = otp_input;
            GM_setValue("isSecretEntered", true); // this is for insert the code only once
            document.getElementsByName("_eventId_proceed")[0].click();
            GM_setValue("stats", GM_getValue('stats') + 1);
        } else {
            const clicked = showNotification(otp_input);
        }
    }

    function showNotification(myCode) {
        GM_notification({
            text: "Your 2FA code was incorrect \nClick to show a new code, check it against the application or close this notification",
            title: "TUD Autologin",
            url: 'https:/google.com/',
            silent: true,
            timeout: 10000,
            onclick: (event) => {
                // The userscript is still running, so don't open example.com
                event.preventDefault();
                GM_notification({
                    title: "TUD Autologin",
                    text: "New Code is: " + myCode + "\nClick to enter the new code",
                    silent: true,
                    onclick: (event) => {
                        document.getElementById("fudis_otp_input").value = myCode;
                    }
                });
            }
        });
    }

})();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function darkThemeIDP() {
    const background = document.querySelector('body');
    const mainBox = document.querySelector('main');
    const inputs = document.querySelectorAll('input');
    background.style.backgroundColor = '#232323';
    mainBox.style.backgroundColor = '#696969';
    inputs.forEach(input => {
        input.style.backgroundColor = '#696969';
        input.style.color = '#fff';
    });
}

// TOTP Code modified from https://github.com/tkooda/totp.info and fixed base32tohex function without check the correctness the secret set

function dec2hex(s) { return (s < 15.5 ? '0' : '') + Math.round(s).toString(16); }
function hex2dec(s) { return parseInt(s, 16); }

function base32tohex(base32) {
    var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    var bits = "";
    var hex = "";

    for (var i = 0; i < base32.length; i++) {
        var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
        bits += leftpad(val.toString(2), 5, '0');
    }

    for (var n = 0; n + 4 <= bits.length; n += 4) {
        var chunk = bits.substr(n, 4);
        hex = hex + parseInt(chunk, 2).toString(16);
    }
    return hex.length % 2 ? hex + "0" : hex;
};


function leftpad(str, len, pad) {
    if (len + 1 >= str.length) {
        str = Array(len + 1 - str.length).join(pad) + str;
    }
    return str;
};

function updateOtp(secret) {
    var epoch = Math.round((new Date().getTime()) / 1000.0);
    var time = leftpad(dec2hex(Math.floor(epoch / 30)), 16, '0');
    var shaObj = new jsSHA("SHA-1", "HEX");
    shaObj.setHMACKey(base32tohex(secret), "HEX");
    shaObj.update(time);
    var hmac = shaObj.getHMAC("HEX");

    if (hmac == 'KEY MUST BE IN BYTE INCREMENTS') {

    } else {
        var offset = hex2dec(hmac.substring(hmac.length - 1));
    }

    var otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec('7fffffff')) + '';
    otp = (otp).substr(otp.length - 6, 6);

    return otp;
};

function getOTP(secret) {
    if (secret) {
        return updateOtp(secret);
    } else {
        return undefined;
    }
};
