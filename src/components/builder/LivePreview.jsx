import { Card } from '../ui/Card';

function SectionH({ children, isUS, isIndian, isMinimal }) {
  return (
    <h2 className={`font-bold uppercase mb-3 ${
      isUS      ? 'text-sm tracking-widest border-b border-black pb-1 text-black' :
      isIndian  ? 'text-sm text-gray-900 underline' :
      isMinimal ? 'text-xs text-gray-400 tracking-[0.3em]' :
                  'text-sm border-b border-gray-200 pb-1 text-gray-700'
    }`}>{children}</h2>
  );
}

export default function LivePreview({ data, template = 'modern' }) {
  if (!data) {
    return (
      <div className="min-h-[700px] bg-white flex flex-col items-center justify-center text-gray-400 gap-3 p-8">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="4" width="48" height="56" rx="4" stroke="#d1d5db" strokeWidth="2"/>
          <line x1="16" y1="16" x2="48" y2="16" stroke="#d1d5db" strokeWidth="2"/>
          <line x1="16" y1="24" x2="48" y2="24" stroke="#d1d5db" strokeWidth="2"/>
          <line x1="16" y1="32" x2="36" y2="32" stroke="#d1d5db" strokeWidth="2"/>
          <line x1="16" y1="40" x2="44" y2="40" stroke="#d1d5db" strokeWidth="2"/>
          <line x1="16" y1="48" x2="32" y2="48" stroke="#d1d5db" strokeWidth="2"/>
        </svg>
        <p className="text-sm font-medium">Fill the form and click <strong>Build My Resume</strong></p>
        <p className="text-xs">Live preview appears here instantly</p>
      </div>
    );
  }

  const isIndian = template === 'indian';
  const isUS     = template === 'us';
  const isMinimal= template === 'minimal';
  const isModern = !isIndian && !isUS && !isMinimal;

  const containerStyle = `
    min-h-[850px] bg-white text-black relative text-[11px] leading-relaxed
    ${isIndian  ? 'font-serif border-4 border-double border-gray-700 p-8' : ''}
    ${isUS      ? 'font-sans p-8' : ''}
    ${isMinimal ? 'font-sans p-10' : ''}
    ${isModern  ? 'font-sans p-0' : ''}
  `;

  const educationList = Array.isArray(data.education) ? data.education : [];
  const experienceList = Array.isArray(data.experience) ? data.experience : [];
  const skillList = Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'string' ? data.skills.split(',') : []);
  const projectList = Array.isArray(data.projects) ? data.projects : [];
  const achievementList = Array.isArray(data.achievements) ? data.achievements : (data.achievements ? [data.achievements] : []);
  const certList = Array.isArray(data.certifications) ? data.certifications : (data.certifications ? data.certifications.split('\n') : []);
  const interestList = Array.isArray(data.interests) ? data.interests : (data.interests ? data.interests.split(',').map(s => s.trim()) : []);

  return (
    <div className={containerStyle}>

      {/* ─── MODERN TEMPLATE ────────────────────────────────────── */}
      {isModern && (
        <>
          {/* Header bar */}
          <div className="bg-gradient-to-r from-[#1a1a3e] to-[#7c3aed] text-white px-8 py-6">
            <h1 className="text-2xl font-black uppercase tracking-widest">{data.name || 'Your Name'}</h1>
            {data.targetRole && <p className="text-purple-200 font-medium text-xs mt-0.5 tracking-wider">{data.targetRole.toUpperCase()}</p>}
            <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-purple-200">
              {data.email    && <span>✉ {data.email}</span>}
              {data.phone    && <span>📞 {data.phone}</span>}
              {data.location && <span>📍 {data.location}</span>}
              {data.dob      && <span>🎂 {data.dob}</span>}
              {data.languages && <span>🗣 {data.languages}</span>}
            </div>
            {/* Social Links */}
            {data.links && (data.links.linkedin || data.links.github || data.links.portfolio || data.links.vercel) && (
              <div className="flex flex-wrap gap-3 mt-1.5 text-[10px]">
                {data.links.linkedin  && <a href={data.links.linkedin.startsWith('http') ? data.links.linkedin : `https://${data.links.linkedin}`} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-white">🔗 LinkedIn</a>}
                {data.links.github    && <a href={data.links.github.startsWith('http') ? data.links.github : `https://${data.links.github}`} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-white">🐱 GitHub</a>}
                {data.links.portfolio && <a href={data.links.portfolio.startsWith('http') ? data.links.portfolio : `https://${data.links.portfolio}`} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-white">🌐 Portfolio</a>}
                {data.links.vercel    && <a href={data.links.vercel.startsWith('http') ? data.links.vercel : `https://${data.links.vercel}`} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-white">▲ {data.links.vercel}</a>}
              </div>
            )}
          </div>

          <div className="px-8 py-5 space-y-4">
            {data.summary && (
              <div>
                <SectionH isModern>Career Objective</SectionH>
                <p className="text-gray-700 leading-relaxed">{data.summary}</p>
              </div>
            )}

            {educationList.length > 0 && (
              <div>
                <SectionH isModern>Education</SectionH>
                <div className="space-y-2">
                  {educationList.map((e, i) => (
                    <div key={i} className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-900">{e.degree} {e.fieldOfStudy ? `— ${e.fieldOfStudy}` : ''}</p>
                        <p className="text-gray-600">{e.college || e.school} {e.board ? `| ${e.board}` : ''}</p>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        {e.year && <p className="text-gray-600">{e.year}</p>}
                        {e.percentage && <p className="font-bold text-purple-700">{e.percentage}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {experienceList.length > 0 && (
              <div>
                <SectionH isModern>Experience</SectionH>
                {experienceList.map((exp, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between"><p className="font-bold text-gray-900">{exp.role}</p><p className="text-gray-500">{exp.duration}</p></div>
                    <p className="text-purple-700 font-semibold mb-1">{exp.company}</p>
                    <ul className="space-y-0.5 list-disc list-inside text-gray-700">
                      {(Array.isArray(exp.responsibilities) ? exp.responsibilities : []).map((r, j) => <li key={j}>{r}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {projectList.length > 0 && (
              <div>
                <SectionH isModern>Projects</SectionH>
                {projectList.map((p, i) => (
                  <div key={i} className="mb-2">
                    <p className="font-bold text-gray-900">{p.name} {p.techStack ? <span className="font-normal text-gray-500">| {p.techStack}</span> : ''}</p>
                    <p className="text-gray-600">{p.description}</p>
                  </div>
                ))}
              </div>
            )}

            {skillList.length > 0 && (
              <div>
                <SectionH isModern>Technical Skills</SectionH>
                <div className="flex flex-wrap gap-1.5">
                  {skillList.map((s, i) => <span key={i} className="bg-purple-50 border border-purple-200 text-purple-800 px-2 py-0.5 rounded text-[10px] font-medium">{s}</span>)}
                </div>
              </div>
            )}

            {certList.filter(Boolean).length > 0 && (
              <div>
                <SectionH isModern>Certifications</SectionH>
                <ul className="space-y-0.5 list-disc list-inside text-gray-700">
                  {certList.filter(Boolean).map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            )}

            {achievementList.filter(Boolean).length > 0 && (
              <div>
                <SectionH isModern>Achievements</SectionH>
                <ul className="space-y-0.5 list-disc list-inside text-gray-700">
                  {achievementList.filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
            )}

            {interestList.filter(Boolean).length > 0 && (
              <div>
                <SectionH isModern>Interests & Hobbies</SectionH>
                <p className="text-gray-700">{interestList.filter(Boolean).join(' • ')}</p>
              </div>
            )}

            {(data.fatherName || data._showDeclaration) && (
              <div className="pt-3 border-t border-gray-200">
                {data.fatherName && <p className="text-gray-600">Father&apos;s Name: <strong>{data.fatherName}</strong></p>}
              </div>
            )}
          </div>
        </>
      )}

      {/* ─── INDIAN TEMPLATE ────────────────────────────────────── */}
      {isIndian && (
        <>
          <div className="text-center mb-5">
            <h1 className="text-xl font-black uppercase tracking-widest underline">{data.name || 'Your Name'}</h1>
            {data.targetRole && <p className="font-bold text-sm mt-0.5">{data.targetRole}</p>}
            <div className="flex flex-wrap justify-center gap-2 mt-1 text-[10px] text-gray-700">
              {data.email    && <span>{data.email}</span>}
              {data.phone    && <span> | {data.phone}</span>}
              {data.location && <span> | {data.location}</span>}
            </div>
          </div>

          <div className="space-y-4">
            {data.summary && (
              <div className="border border-gray-400 p-3">
                <h2 className="font-bold uppercase underline text-xs mb-1">Career Objective</h2>
                <p>{data.summary}</p>
              </div>
            )}

            {educationList.length > 0 && (
              <div>
                <h2 className="font-bold uppercase underline text-xs mb-2">Academic Qualifications</h2>
                <table className="w-full text-[10px] border border-gray-400 border-collapse">
                  <thead><tr className="bg-gray-100">
                    <th className="border border-gray-400 px-2 py-1 text-left">Qualification</th>
                    <th className="border border-gray-400 px-2 py-1 text-left">Institution</th>
                    <th className="border border-gray-400 px-2 py-1 text-left">Board/Univ</th>
                    <th className="border border-gray-400 px-2 py-1 text-left">Year</th>
                    <th className="border border-gray-400 px-2 py-1 text-left">%/CGPA</th>
                  </tr></thead>
                  <tbody>
                    {educationList.map((e, i) => (
                      <tr key={i}>
                        <td className="border border-gray-400 px-2 py-1 font-medium">{e.degree} {e.fieldOfStudy ? `(${e.fieldOfStudy})` : ''}</td>
                        <td className="border border-gray-400 px-2 py-1">{e.college || e.school}</td>
                        <td className="border border-gray-400 px-2 py-1">{e.board || '—'}</td>
                        <td className="border border-gray-400 px-2 py-1">{e.year}</td>
                        <td className="border border-gray-400 px-2 py-1 font-bold">{e.percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {skillList.length > 0 && (
              <div>
                <h2 className="font-bold uppercase underline text-xs mb-1">Technical Skills</h2>
                <p>{skillList.join(', ')}</p>
              </div>
            )}

            {experienceList.length > 0 && (
              <div>
                <h2 className="font-bold uppercase underline text-xs mb-2">Experience</h2>
                {experienceList.map((exp, i) => (
                  <div key={i} className="mb-2">
                    <p className="font-bold">{exp.role} — {exp.company} ({exp.duration})</p>
                    <ul className="list-disc list-inside">
                      {(exp.responsibilities || []).map((r, j) => <li key={j}>{r}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {projectList.length > 0 && (
              <div>
                <h2 className="font-bold uppercase underline text-xs mb-1">Projects</h2>
                {projectList.map((p, i) => (
                  <div key={i} className="mb-1">
                    <p className="font-bold">{p.name} <span className="font-normal text-gray-600">| {p.techStack}</span></p>
                    <p>{p.description}</p>
                  </div>
                ))}
              </div>
            )}

            {certList.filter(Boolean).length > 0 && (
              <div>
                <h2 className="font-bold uppercase underline text-xs mb-1">Certifications</h2>
                <ul className="list-disc list-inside">{certList.filter(Boolean).map((c, i) => <li key={i}>{c}</li>)}</ul>
              </div>
            )}

            {achievementList.filter(Boolean).length > 0 && (
              <div>
                <h2 className="font-bold uppercase underline text-xs mb-1">Achievements</h2>
                <ul className="list-disc list-inside">{achievementList.filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}</ul>
              </div>
            )}

            {interestList.filter(Boolean).length > 0 && (
              <div>
                <h2 className="font-bold uppercase underline text-xs mb-1">Interests & Hobbies</h2>
                <p>{interestList.join(' | ')}</p>
              </div>
            )}

            {/* Personal Details */}
            <div>
              <h2 className="font-bold uppercase underline text-xs mb-1">Personal Details</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[10px]">
                {data.dob        && <p>Date of Birth: <strong>{data.dob}</strong></p>}
                {data.fatherName && <p>Father&apos;s Name: <strong>{data.fatherName}</strong></p>}
                {data.languages  && <p>Languages: <strong>{data.languages}</strong></p>}
                {data.location   && <p>Address: <strong>{data.location}</strong></p>}
              </div>
            </div>

            {/* Declaration */}
            <div className="mt-6 p-3 border border-gray-400 bg-gray-50">
              <h2 className="font-bold uppercase underline text-xs mb-1">Declaration</h2>
              <p className="text-[10px] text-gray-600">I hereby declare that the information furnished above is true and correct to the best of my knowledge and belief.</p>
              <div className="flex justify-between mt-4 text-[10px]">
                <p>Place: ___________</p>
                <p>Date: ___________</p>
                <p>Signature: ___________</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ─── USA / MINIMAL TEMPLATES ────────────────────────────── */}
      {(isUS || isMinimal) && (
        <>
          <div className={isUS ? 'text-center border-b-2 border-black pb-4 mb-4' : 'mb-6'}>
            <h1 className={isUS ? 'text-3xl font-normal uppercase tracking-widest' : 'text-4xl font-light tracking-tight'}>{data.name || 'Your Name'}</h1>
            {data.targetRole && <p className={isUS ? 'text-xs tracking-[0.2em] mt-0.5 uppercase' : 'text-gray-400 font-light mt-1'}>{data.targetRole}</p>}
            <div className={`flex flex-wrap gap-3 mt-2 text-[10px] ${isUS ? 'justify-center' : ''} text-gray-500`}>
              {data.email    && <span>{data.email}</span>}
              {data.phone    && <span>•  {data.phone}</span>}
              {data.location && <span>•  {data.location}</span>}
            </div>
          </div>

          <div className="space-y-4">
            {data.summary && (
              <div><SectionH isUS={isUS} isMinimal={isMinimal}>Summary</SectionH><p className="text-gray-600">{data.summary}</p></div>
            )}

            {educationList.length > 0 && (
              <div>
                <SectionH isUS={isUS} isMinimal={isMinimal}>Education</SectionH>
                {educationList.map((e, i) => (
                  <div key={i} className="flex justify-between mb-1">
                    <div>
                      <p className="font-bold">{e.degree} {e.fieldOfStudy ? `in ${e.fieldOfStudy}` : ''}</p>
                      <p className="text-gray-500">{e.college || e.school}</p>
                    </div>
                    <div className="text-right text-[10px] text-gray-500">
                      <p>{e.year}</p>
                      {e.percentage && <p>{e.percentage}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {experienceList.length > 0 && (
              <div>
                <SectionH isUS={isUS} isMinimal={isMinimal}>Experience</SectionH>
                {experienceList.map((exp, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between"><p className="font-bold">{exp.role} — {exp.company}</p><p className="text-gray-500 text-[10px]">{exp.duration}</p></div>
                    <ul className="list-disc list-inside text-gray-600 space-y-0.5">{(exp.responsibilities||[]).map((r,j) => <li key={j}>{r}</li>)}</ul>
                  </div>
                ))}
              </div>
            )}

            {projectList.length > 0 && (
              <div>
                <SectionH isUS={isUS} isMinimal={isMinimal}>Projects</SectionH>
                {projectList.map((p,i) => (
                  <div key={i} className="mb-2">
                    <p className="font-bold">{p.name} <span className="font-normal text-gray-500 text-[10px]">| {p.techStack}</span></p>
                    <p className="text-gray-600">{p.description}</p>
                  </div>
                ))}
              </div>
            )}

            {skillList.length > 0 && (
              <div>
                <SectionH isUS={isUS} isMinimal={isMinimal}>Skills</SectionH>
                <div className="flex flex-wrap gap-1">
                  {skillList.map((s,i) => <span key={i} className="border border-gray-300 px-2 py-0.5 rounded text-[10px]">{s}</span>)}
                </div>
              </div>
            )}

            {certList.filter(Boolean).length > 0 && (
              <div>
                <SectionH isUS={isUS} isMinimal={isMinimal}>Certifications</SectionH>
                <ul className="list-disc list-inside text-gray-600">{certList.filter(Boolean).map((c,i) => <li key={i}>{c}</li>)}</ul>
              </div>
            )}

            {achievementList.filter(Boolean).length > 0 && (
              <div>
                <SectionH isUS={isUS} isMinimal={isMinimal}>Achievements</SectionH>
                <ul className="list-disc list-inside text-gray-600">{achievementList.filter(Boolean).map((a,i) => <li key={i}>{a}</li>)}</ul>
              </div>
            )}

            {interestList.filter(Boolean).length > 0 && (
              <div>
                <SectionH isUS={isUS} isMinimal={isMinimal}>Interests</SectionH>
                <p className="text-gray-600">{interestList.join(' · ')}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
