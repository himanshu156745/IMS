import { ArrowRight } from "lucide-react";
import Button from "./ui/Button.jsx";
import Card from "./ui/Card.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";
import InternshipCard from "./InternshipCard.jsx";

export default function RecommendedInternships({ internships, onApply, onViewAll }) {
  return (
    <Card className="p-5 sm:p-6">
      <SectionHeader title="Recommended Internships For You" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} onApply={onApply} />
        ))}
      </div>
      <Button
        variant="ghost"
        className="mt-5 w-full justify-center border border-gray-200"
        icon={ArrowRight}
        onClick={onViewAll}
      >
        View All Internships
      </Button>
    </Card>
  );
}
