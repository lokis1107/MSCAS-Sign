'use client'

import { useMemo, useState } from 'react'
import { Check, Clipboard, Code2, Download, FileSignature, Link2, Mail, Monitor, Phone, Plus, RefreshCw, RotateCcw, Smartphone, Sparkles, Trash2, UserRound } from 'lucide-react'

const LOGO_URL = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FiHMaf9EjlWQoetF85KJvbP0in2Lpb.png'
const WEBSITE_URL = 'https://www.mscartsandscience-edu.in/'
const designations = ['Principal', 'Vice Principal', 'Head of Department (HOD)', 'Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Teaching Assistant', 'Lab Assistant', 'Technical Assistant', 'System Administrator', 'ERP & Data Analyst', 'Administrative Officer', 'Office Assistant', 'Accountant', 'Librarian', 'Student', 'Other']
const departments = ['Computer Science', 'Information Technology', 'Artificial Intelligence & Data Science', 'Commerce', 'Business Administration', 'Mathematics', 'Physics', 'Chemistry', 'English', 'Tamil', 'Other']

type SocialLink = { id: number; url: string }
type FormData = { name: string; designation: string; otherDesignation: string; phone: string; email: string; department: string; otherDepartment: string; socialLinks: SocialLink[] }
const initialData: FormData = { name: '', designation: '', otherDesignation: '', phone: '', email: '', department: '', otherDepartment: '', socialLinks: [] }

const socialPlatforms = [
  { key: 'youtube', label: 'YouTube', icon: 'https://cdn.simpleicons.org/youtube/FF0000' },
  { key: 'linkedin', label: 'LinkedIn', icon: 'https://cdn.simpleicons.org/linkedin/0A66C2' },
  { key: 'instagram', label: 'Instagram', icon: 'https://cdn.simpleicons.org/instagram/E4405F' },
  { key: 'facebook', label: 'Facebook', icon: 'https://cdn.simpleicons.org/facebook/1877F2' },
  { key: 'x', label: 'X', icon: 'https://cdn.simpleicons.org/x/111111' },
] as const
function detectSocialPlatform(url: string) {
  const value = url.toLowerCase().trim()
  const normalized = value.replace(/^https?:\/\//, '').replace(/^www\./, '')
  const host = normalized.split('/')[0].split(':')[0]
  if (host === 'youtu.be' || host.endsWith('youtube.com')) return socialPlatforms[0]
  if (host.endsWith('in.linkedin.com') || host === 'lnkd.in') return socialPlatforms[1]
  if (host.endsWith('instagram.com') || host === 'ig.me') return socialPlatforms[2]
  if (host.endsWith('facebook.com') || host === 'fb.me' || host === 'fb.com') return socialPlatforms[3]
  if (host === 'x.com' || host.endsWith('.x.com') || host === 'twitter.com' || host.endsWith('.twitter.com')) return socialPlatforms[4]
  return null
}

function escapeHtml(value: string) { return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]!) }
function normalizeSocialUrl(value: string) { return /^https?:\/\//i.test(value.trim()) ? value.trim() : `https://${value.trim()}` }
function normalizePhone(phone: string) { return phone.replace(/[^\d+]/g, '') }
function getValues(data: FormData) { return { ...data, designation: data.designation === 'Other' ? data.otherDesignation : data.designation, department: data.department === 'Other' ? data.otherDepartment : data.department } }

function generateSignature(data: FormData) {
  const values = getValues(data)
  const name = escapeHtml(values.name || 'Your Name')
  const designation = escapeHtml(values.designation || 'Your Designation')
  const department = values.department ? `<br><span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:15px;color:#667085;font-weight:normal">${escapeHtml(values.department)}</span>` : ''
  const phone = escapeHtml(values.phone || '+91 00000 00000')
  const email = escapeHtml(values.email || 'your.email@mscartsandscience-edu.in')
  const social = values.socialLinks.filter((item) => item.url.trim()).map((item) => { const platform = detectSocialPlatform(item.url); if (!platform) return ''; return `<a href="${escapeHtml(normalizeSocialUrl(item.url))}" target="_blank" rel="noopener noreferrer" title="${platform.label}" aria-label="${platform.label}" style="display:inline-block;vertical-align:middle;margin:0 6px 0 0;text-decoration:none"><img src="${platform.icon}" alt="${platform.label}" width="16" height="16" style="display:block;width:16px;height:16px;border:0;outline:none"></a>` }).join('')
  const socialRow = social ? `<div style="margin-top:4px;line-height:16px">${social}</div>` : ''
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="440" style="width:440px;max-width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;font-family:Arial,Helvetica,sans-serif;color:#162033;background:#ffffff"><tr><td align="center" valign="middle" width="115" style="width:115px;max-width:115px;padding:2px 14px 8px 0;vertical-align:middle;text-align:center;border-right:1px solid #1746a2;border-bottom:1px solid #1746a2"><img src="${LOGO_URL}" alt="Mohamed Sathak College of Arts &amp; Science" width="100" height="100" style="width:100px;height:100px;max-width:100px;max-height:100px;display:block;margin:0 auto;border:0;outline:none;text-decoration:none"></td><td valign="middle" width="325" style="width:325px;padding:2px 0 8px 14px;vertical-align:middle;text-align:left;border-bottom:1px solid #1746a2"><div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:20px;font-weight:700;color:#1746a2;letter-spacing:-0.1px">${name}</div><div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:16px;color:#344054;font-weight:600;margin-top:2px">${designation}${department}</div><div style="font-family:Arial,Helvetica,sans-serif;font-size:11.5px;line-height:17px;color:#344054;margin-top:4px"><a href="tel:${normalizePhone(values.phone)}" style="color:#344054;text-decoration:none">${phone}</a><br><a href="mailto:${email}" style="color:#344054;text-decoration:none">${email}</a></div>${socialRow}</td></tr><tr><td colspan="2" style="padding-top:8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:15px;color:#667085"><strong style="color:#1746a2;font-size:11.5px;font-weight:700">Mohamed Sathak College of Arts &amp; Science (MSCAS)</strong><br>Sponsored by Mohamed Sathak Trust<br>Affiliated to the University of Madras | Approved by UGC &amp; AICTE<br>ISO 9001:2015 Certified Institution<br>Sholinganallur, Chennai – 600119, Tamil Nadu, India<br>Phone: <a href="tel:+919786425226" style="color:#667085;text-decoration:none">+91 97864 25226</a>; <a href="tel:+919940004503" style="color:#667085;text-decoration:none">+91 99400 04503</a><div style="margin-top:4px"><a href="${WEBSITE_URL}" target="_blank" rel="noopener noreferrer" style="color:#1746a2;text-decoration:none;font-weight:600;font-size:11px;line-height:15px">Want to know more about us?</a></div></td></tr></table>`
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) { return <label className="field"><span>{label} {required && <b>*</b>}</span>{children}</label> }
function IconBadge({ children }: { children: React.ReactNode }) { return <span className="icon-badge">{children}</span> }

export default function SignatureGenerator() {
  const [data, setData] = useState<FormData>(initialData)
  const [mode, setMode] = useState<'desktop' | 'mobile'>('desktop')
  const [toast, setToast] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const values = useMemo(() => getValues(data), [data])
  const html = useMemo(() => generateSignature(data), [data])
  const valid = Boolean(data.name.trim() && data.designation && values.designation.trim() && data.phone.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
  const update = (key: keyof FormData, value: string) => setData((current) => ({ ...current, [key]: value }))
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 3200) }
  const copyRichSignature = async (markup: string, plainText: string) => {
    if (navigator.clipboard?.write && typeof ClipboardItem !== 'undefined') {
      try {
        await navigator.clipboard.write([new ClipboardItem({
          'text/html': new Blob([markup], { type: 'text/html' }),
          'text/plain': new Blob([plainText], { type: 'text/plain' }),
        })])
        return
      } catch {
        // Fall through to the selection-based rich clipboard path when permissions block ClipboardItem.
      }
    }

    const staging = document.createElement('div')
    staging.contentEditable = 'true'
    staging.innerHTML = markup
    staging.style.cssText = 'position:fixed;left:-9999px;top:0;width:440px;opacity:0;pointer-events:none;'
    document.body.appendChild(staging)
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(staging)
    selection?.removeAllRanges()
    selection?.addRange(range)
    const copied = document.execCommand('copy')
    selection?.removeAllRanges()
    staging.remove()
    if (!copied) throw new Error('Rich clipboard copy was not available')
  }
  const copySignature = async () => {
    setSubmitted(true)
    if (!valid) { notify('Please complete the required fields first.'); return }
    try {
      const plain = `${values.name}\n${values.designation}${values.department ? ` · ${values.department}` : ''}\n${values.phone}\n${values.email}`
      await copyRichSignature(html, plain)
      notify('Your professional email signature has been copied successfully!')
    } catch {
      notify('Unable to copy the formatted signature. Please allow clipboard access and try again.')
    }
  }
  const copyHtml = async () => { try { await navigator.clipboard.writeText(html); notify('HTML source copied to clipboard.') } catch { notify('Unable to copy the HTML source.') } }
  const download = () => { const blob = new Blob([`<!doctype html><html><body>${html}</body></html>`], { type: 'text/html' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'mscas-email-signature.html'; link.click(); URL.revokeObjectURL(url); notify('HTML signature downloaded.') }
  const addSocialLink = () => setData((current) => ({ ...current, socialLinks: [...current.socialLinks, { id: Date.now(), url: '' }] }))
  const updateSocialLink = (id: number, url: string) => setData((current) => ({ ...current, socialLinks: current.socialLinks.map((item) => item.id === id ? { ...item, url } : item) }))
  const removeSocialLink = (id: number) => setData((current) => ({ ...current, socialLinks: current.socialLinks.filter((item) => item.id !== id) }))

  return <main className="app-shell"><header className="topbar"><div className="brand"><img src={LOGO_URL} alt="Mohamed Sathak College logo" /><div><div className="eyebrow">MSCAS · DIGITAL TOOLKIT</div><h1>Email Signature Generator</h1></div></div><span className="status-pill"><span />Professional Signature Builder</span></header><section className="hero"><div><p className="kicker"><Sparkles size={15} /> INSTITUTIONAL IDENTITY, ELEVATED</p><h2>Create a signature<br /><em>that represents you.</em></h2><p className="hero-copy">Build a polished, professional email signature in seconds — ready for Gmail, Outlook, and every conversation in between.</p></div><div className="hero-mark"><div>01</div><span>CREATE<br />WITH<br />CONFIDENCE</span></div></section><div className="workspace"><section className="panel form-panel"><div className="panel-heading"><IconBadge><UserRound size={17} /></IconBadge><div><h3>Create Your Signature</h3><p>Enter your professional details below.</p></div></div><div className="form-grid"><Field label="Full Name" required><input value={data.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Dr. Priya Sharma" aria-invalid={submitted && !data.name} /></Field><Field label="Designation / Role" required><select value={data.designation} onChange={(e) => update('designation', e.target.value)}><option value="">Select your role</option>{designations.map((item) => <option key={item}>{item}</option>)}</select></Field>{data.designation === 'Other' && <Field label="Your Designation" required><input value={data.otherDesignation} onChange={(e) => update('otherDesignation', e.target.value)} placeholder="Enter designation" /></Field>}<Field label="Phone Number" required><div className="input-with-icon"><Phone size={15} /><input type="tel" value={data.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 98765 43210" /></div></Field><Field label="Email Address" required><div className="input-with-icon"><Mail size={15} /><input type="email" value={data.email} onChange={(e) => update('email', e.target.value)} placeholder="name@mscartsandscience-edu.in" /></div></Field><Field label="Department"><select value={data.department} onChange={(e) => update('department', e.target.value)}><option value="">Select department (optional)</option>{departments.map((item) => <option key={item}>{item}</option>)}</select></Field>{data.department === 'Other' && <Field label="Custom Department"><input value={data.otherDepartment} onChange={(e) => update('otherDepartment', e.target.value)} placeholder="Enter department" /></Field>}<div className="social-field"><div className="social-field-header"><span className="field-label">Social Media Links <small>Optional</small></span><button type="button" className="add-link-button" onClick={addSocialLink}><Plus size={14} /> Add link</button></div>{data.socialLinks.map((item) => { const platform = detectSocialPlatform(item.url); return <div className="social-link-row" key={item.id}><div className="input-with-icon"><Link2 size={15} /><input type="url" value={item.url} onChange={(e) => updateSocialLink(item.id, e.target.value)} placeholder="https://in.linkedin.com/yourname" aria-label="Social media URL" />{platform && <img className="social-detected-icon" src={platform.icon} alt={`${platform.label} icon`} />}</div><button type="button" className="remove-link-button" onClick={() => removeSocialLink(item.id)} aria-label="Remove social media link"><Trash2 size={15} /></button></div> })}{data.socialLinks.length === 0 && <p className="social-help">Add YouTube, LinkedIn, Instagram, Facebook, or X links to show official icons.</p>}</div></div><div className="form-note"><span>*</span> Required fields · Your information stays in this browser.</div><div className="form-actions"><button className="primary-button" onClick={copySignature}><Clipboard size={17} /> Copy Email Signature</button><button className="ghost-button" onClick={() => { setData(initialData); setSubmitted(false); notify('Form reset successfully.') }}><RotateCcw size={15} /> Reset</button></div></section><section className="preview-column"><div className="preview-heading"><div><p className="section-label">OUTPUT PREVIEW</p><h3>Live Signature Preview</h3></div><div className="toggle"><button className={mode === 'desktop' ? 'active' : ''} onClick={() => setMode('desktop')}><Monitor size={14} /> Desktop</button><button className={mode === 'mobile' ? 'active' : ''} onClick={() => setMode('mobile')}><Smartphone size={14} /> Mobile</button></div></div><div className={`preview-stage ${mode}`}><div className="preview-card"><div className="preview-card-top"><span>EMAIL SIGNATURE</span><span>MSCAS / 01</span></div><div className="signature-flat" dangerouslySetInnerHTML={{ __html: html }} /></div></div><div className="action-row"><button onClick={copyHtml}><Code2 size={15} /> Copy HTML</button><button onClick={download}><Download size={15} /> Download HTML</button><button onClick={() => notify('Signature regenerated with your current details.')}><RefreshCw size={15} /> Regenerate</button></div></section></div><section className="instructions"><div className="instructions-title"><p className="section-label">A SIMPLE FOUR-STEP FLOW</p><h3>How to Use Your Email Signature</h3></div><div className="steps">{[['01', 'Add your details', 'Enter your name, designation, phone, and email.'], ['02', 'Review the preview', 'Your signature updates instantly as you type.'], ['03', 'Copy your signature', 'One click copies the fully formatted HTML.'], ['04', 'Paste & go', 'Open Gmail or Outlook and paste it into settings.']].map(([number, title, copy]) => <div className="step" key={number}><span>{number}</span><div><h4>{title}</h4><p>{copy}</p></div></div>)}</div></section><footer><span>© {new Date().getFullYear()} Mohamed Sathak College of Arts & Science</span><span>Designed for professional communication <FileSignature size={14} /></span></footer>{toast && <div className="toast"><Check size={17} />{toast}</div>}</main>
}
