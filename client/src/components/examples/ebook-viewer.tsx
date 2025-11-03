import { EBookList } from "../ebook-viewer";

export default function EBookViewerExample() {
  const mockBooks = [
    {
      id: "1",
      title: "Financial Management for MBA Students",
      subject: "Finance",
      author: "Dr. R.K. Sharma",
      uploadedBy: "Prof. Kumar",
      fileSize: "12.5 MB",
      isPublic: true,
    },
    {
      id: "2",
      title: "Strategic Marketing Analysis",
      subject: "Marketing",
      author: "Prof. P. Singh",
      uploadedBy: "Dr. Patel",
      fileSize: "8.2 MB",
      isPublic: true,
    },
    {
      id: "3",
      title: "Operations Research Methods",
      subject: "Operations",
      author: "Dr. M. Verma",
      uploadedBy: "Prof. Kumar",
      fileSize: "15.8 MB",
      isPublic: false,
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">E-Book Library</h2>
      <EBookList
        books={mockBooks}
        onView={(book) => console.log("View book:", book)}
        onDownload={(book) => console.log("Download book:", book)}
      />
    </div>
  );
}
