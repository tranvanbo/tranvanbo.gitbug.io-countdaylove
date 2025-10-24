import React from 'react';

interface MilestoneTrackerProps {
    startDate: string;
}

const MILESTONES_IN_DAYS = [100, 200, 300, 365, 500, 730, 1000, 1500, 2000, 3650, 5000];

const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ startDate }) => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Day count starts at 1 on the first day
    const elapsedDays = Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const upcomingMilestones = MILESTONES_IN_DAYS.map((milestoneDays, index) => {
            const prevMilestone = index === 0 ? 0 : MILESTONES_IN_DAYS[index - 1];
            return { milestoneDays, prevMilestone };
        })
        .filter(m => m.milestoneDays >= elapsedDays)
        .slice(0, 4)
        .map(({ milestoneDays, prevMilestone }) => {
            const milestoneDate = new Date(start);
            milestoneDate.setDate(start.getDate() + milestoneDays - 1);
            const daysRemaining = milestoneDays - elapsedDays;
            
            let label = `${milestoneDays} days`;
            if (milestoneDays === 365) label = '1 Year';
            if (milestoneDays === 730) label = '2 Years';
            if (milestoneDays === 1095) label = '3 Years';
            if (milestoneDays === 3650) label = '10 Years';

            const totalDaysInMilestone = milestoneDays - prevMilestone;
            const daysIntoMilestone = elapsedDays - prevMilestone;
            const progress = (daysIntoMilestone / totalDaysInMilestone) * 100;

            return {
                label,
                date: milestoneDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                daysRemaining,
                progress: Math.min(progress, 100)
            };
        });

    return (
        <section className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl shadow-lg">
            <h2 className="font-dancing-script text-2xl text-rose-500 text-center mb-4">Upcoming Milestones</h2>
            <ul className="space-y-4">
                {upcomingMilestones.map((milestone, index) => (
                    <li key={index} className="space-y-2">
                        <div className="flex justify-between items-baseline">
                            <p className="font-bold text-rose-800">{milestone.label}</p>
                             <p className="text-sm font-semibold text-rose-500">
                                {milestone.daysRemaining > 0 ? `${milestone.daysRemaining} days left` : "Today!"}
                            </p>
                        </div>
                         <div className="w-full bg-rose-200/50 rounded-full h-2.5">
                            <div className="bg-rose-400 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${milestone.progress}%` }}></div>
                        </div>
                        <p className="text-right text-xs text-gray-500">{milestone.date}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default MilestoneTracker;