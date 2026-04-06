"use client";

export default function FormPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Registration Form</h1>
        
        <div className="flex justify-center">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSf8MfIYujegX7DyU0-rCpHEsGCq0m9kdjehGF8UZmllCkISrg/viewform?embedded=true"
            width="640"
            height="1454"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="w-full max-w-2xl"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
}
