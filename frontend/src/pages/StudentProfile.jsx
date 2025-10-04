import React, { useEffect, useState } from "react";

const initialProfile = {
  fullName: "",
  dateOfBirth: "",
  schoolName: "",
  schoolAddress: "",
  education: [{ degree: "", institution: "", graduationDate: "", coursework: "" }],
  projects: [{ title: "", role: "", skills: "", description: "" }],
  research: "",
  certifications: "",
  skills: "",
  languages: "",
  experience: [{ organization: "", role: "", start: "", end: "", summary: "" }],
  volunteer: [{ organization: "", role: "", start: "", end: "", summary: "" }],
  achievements: "",
  leadership: "",
  interests: "",
  goals: "",
  learningStyle: "",
  statementOfPurpose: "",
  recommendations: [{ name: "", contact: "", relation: "" }],
  references: [{ name: "", contact: "", relation: "" }],
  portfolio: "",
};

export default function StudentProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("studentProfile");
    if (stored) {
      try { setProfile(JSON.parse(stored)); } catch {}
    }
  }, []);

  const updateField = (field, value) => setProfile((p) => ({ ...p, [field]: value }));

  const updateArrayItem = (field, index, key, value) => {
    setProfile((p) => {
      const arr = [...(p[field] || [])];
      arr[index] = { ...(arr[index] || {}), [key]: value };
      return { ...p, [field]: arr };
    });
  };

  const addArrayItem = (field, emptyItem) => {
    setProfile((p) => ({ ...p, [field]: [...(p[field] || []), emptyItem] }));
  };

  const removeArrayItem = (field, index) => {
    setProfile((p) => ({ ...p, [field]: (p[field] || []).filter((_, i) => i !== index) }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem("studentProfile", JSON.stringify(profile));
      setSavedAt(new Date().toLocaleString());
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Student Profile</h1>
          <button onClick={handleSave} className="btn-primary px-6 py-2" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
        {savedAt && <div className="text-xs text-gray-500 mb-4">Last saved: {savedAt}</div>}

        <section className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Full name</label>
              <input className="input" value={profile.fullName} onChange={(e) => updateField("fullName", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Date of birth</label>
              <input type="date" className="input" value={profile.dateOfBirth} onChange={(e) => updateField("dateOfBirth", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">School name</label>
              <input className="input" value={profile.schoolName} onChange={(e) => updateField("schoolName", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">School address</label>
              <input className="input" value={profile.schoolAddress} onChange={(e) => updateField("schoolAddress", e.target.value)} />
            </div>
          </div>
        </section>

        <Repeater
          title="Education"
          items={profile.education}
          onAdd={() => addArrayItem("education", { degree: "", institution: "", graduationDate: "", coursework: "" })}
          renderItem={(item, i) => (
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Degree" value={item.degree} onChange={(v) => updateArrayItem("education", i, "degree", v)} />
              <Input label="Institution" value={item.institution} onChange={(v) => updateArrayItem("education", i, "institution", v)} />
              <Input label="Graduation (expected/completed)" value={item.graduationDate} onChange={(v) => updateArrayItem("education", i, "graduationDate", v)} />
              <Input label="Relevant coursework" value={item.coursework} onChange={(v) => updateArrayItem("education", i, "coursework", v)} />
            </div>
          )}
          onRemove={(i) => removeArrayItem("education", i)}
        />

        <Repeater
          title="Projects"
          items={profile.projects}
          onAdd={() => addArrayItem("projects", { title: "", role: "", skills: "", description: "" })}
          renderItem={(item, i) => (
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Title" value={item.title} onChange={(v) => updateArrayItem("projects", i, "title", v)} />
              <Input label="Role" value={item.role} onChange={(v) => updateArrayItem("projects", i, "role", v)} />
              <Input label="Skills used" value={item.skills} onChange={(v) => updateArrayItem("projects", i, "skills", v)} />
              <Textarea label="Description" value={item.description} onChange={(v) => updateArrayItem("projects", i, "description", v)} />
            </div>
          )}
          onRemove={(i) => removeArrayItem("projects", i)}
        />

        <SectionTextarea label="Research" value={profile.research} onChange={(v) => updateField("research", v)} />
        <SectionTextarea label="Certifications" value={profile.certifications} onChange={(v) => updateField("certifications", v)} />
        <SectionTextarea label="Skills" value={profile.skills} onChange={(v) => updateField("skills", v)} />
        <SectionTextarea label="Languages" value={profile.languages} onChange={(v) => updateField("languages", v)} />

        <Repeater
          title="Work / Internship Experience"
          items={profile.experience}
          onAdd={() => addArrayItem("experience", { organization: "", role: "", start: "", end: "", summary: "" })}
          renderItem={(item, i) => (
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Organization" value={item.organization} onChange={(v) => updateArrayItem("experience", i, "organization", v)} />
              <Input label="Role" value={item.role} onChange={(v) => updateArrayItem("experience", i, "role", v)} />
              <Input label="Start date" value={item.start} onChange={(v) => updateArrayItem("experience", i, "start", v)} />
              <Input label="End date" value={item.end} onChange={(v) => updateArrayItem("experience", i, "end", v)} />
              <Textarea label="Summary" value={item.summary} onChange={(v) => updateArrayItem("experience", i, "summary", v)} />
            </div>
          )}
          onRemove={(i) => removeArrayItem("experience", i)}
        />

        <Repeater
          title="Volunteer Work"
          items={profile.volunteer}
          onAdd={() => addArrayItem("volunteer", { organization: "", role: "", start: "", end: "", summary: "" })}
          renderItem={(item, i) => (
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Organization" value={item.organization} onChange={(v) => updateArrayItem("volunteer", i, "organization", v)} />
              <Input label="Role" value={item.role} onChange={(v) => updateArrayItem("volunteer", i, "role", v)} />
              <Input label="Start date" value={item.start} onChange={(v) => updateArrayItem("volunteer", i, "start", v)} />
              <Input label="End date" value={item.end} onChange={(v) => updateArrayItem("volunteer", i, "end", v)} />
              <Textarea label="Summary" value={item.summary} onChange={(v) => updateArrayItem("volunteer", i, "summary", v)} />
            </div>
          )}
          onRemove={(i) => removeArrayItem("volunteer", i)}
        />

        <SectionTextarea label="Achievements and Recognition" value={profile.achievements} onChange={(v) => updateField("achievements", v)} />
        <SectionTextarea label="Leadership Roles" value={profile.leadership} onChange={(v) => updateField("leadership", v)} />
        <SectionTextarea label="Interests and Hobbies" value={profile.interests} onChange={(v) => updateField("interests", v)} />
        <SectionTextarea label="Goals and Dreams" value={profile.goals} onChange={(v) => updateField("goals", v)} />
        <SectionTextarea label="Learning Style" value={profile.learningStyle} onChange={(v) => updateField("learningStyle", v)} />

        <SectionTextarea label="Statement of Purpose" value={profile.statementOfPurpose} onChange={(v) => updateField("statementOfPurpose", v)} />

        <Repeater
          title="Letters of Recommendation"
          items={profile.recommendations}
          onAdd={() => addArrayItem("recommendations", { name: "", contact: "", relation: "" })}
          renderItem={(item, i) => (
            <div className="grid sm:grid-cols-3 gap-4">
              <Input label="Name" value={item.name} onChange={(v) => updateArrayItem("recommendations", i, "name", v)} />
              <Input label="Contact" value={item.contact} onChange={(v) => updateArrayItem("recommendations", i, "contact", v)} />
              <Input label="Relation" value={item.relation} onChange={(v) => updateArrayItem("recommendations", i, "relation", v)} />
            </div>
          )}
          onRemove={(i) => removeArrayItem("recommendations", i)}
        />

        <Repeater
          title="References"
          items={profile.references}
          onAdd={() => addArrayItem("references", { name: "", contact: "", relation: "" })}
          renderItem={(item, i) => (
            <div className="grid sm:grid-cols-3 gap-4">
              <Input label="Name" value={item.name} onChange={(v) => updateArrayItem("references", i, "name", v)} />
              <Input label="Contact" value={item.contact} onChange={(v) => updateArrayItem("references", i, "contact", v)} />
              <Input label="Relation" value={item.relation} onChange={(v) => updateArrayItem("references", i, "relation", v)} />
            </div>
          )}
          onRemove={(i) => removeArrayItem("references", i)}
        />

        <SectionTextarea label="Portfolio (links)" value={profile.portfolio} onChange={(v) => updateField("portfolio", v)} />
      </main>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">{label}</label>
      <input className="input" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div className="sm:col-span-2">
      <label className="block text-sm text-gray-700 mb-1">{label}</label>
      <textarea className="input min-h-24" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function SectionTextarea({ label, value, onChange }) {
  return (
    <section className="card mb-6">
      <h2 className="text-lg font-semibold mb-3">{label}</h2>
      <textarea className="input min-h-28" value={value} onChange={(e) => onChange(e.target.value)} />
    </section>
  );
}

function Repeater({ title, items, onAdd, renderItem, onRemove }) {
  return (
    <section className="card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button type="button" className="btn-secondary px-3 py-2" onClick={onAdd}>Add</button>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-gray-200 p-4">
            {renderItem(item, i)}
            <div className="mt-3 text-right">
              <button type="button" className="text-sm text-red-600 hover:underline" onClick={() => onRemove(i)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}












