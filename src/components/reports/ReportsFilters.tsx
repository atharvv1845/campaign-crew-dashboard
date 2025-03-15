
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { campaignData } from '@/components/campaigns/campaignData';
import { useTeamStore } from '@/hooks/useTeamStore';

interface ReportsFiltersProps {
  dateRange: { from: Date | undefined; to: Date | undefined };
  setDateRange: React.Dispatch<React.SetStateAction<{ from: Date | undefined; to: Date | undefined }>>;
  selectedCampaigns: string[];
  setSelectedCampaigns: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTeamMembers: string[];
  setSelectedTeamMembers: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPlatforms: string[];
  setSelectedPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
}

const ReportsFilters: React.FC<ReportsFiltersProps> = ({
  dateRange,
  setDateRange,
  selectedCampaigns,
  setSelectedCampaigns,
  selectedTeamMembers,
  setSelectedTeamMembers,
  selectedPlatforms,
  setSelectedPlatforms
}) => {
  const { teamMembers } = useTeamStore();
  const platforms = ['Email', 'LinkedIn', 'Twitter', 'Phone', 'WhatsApp', 'SMS'];

  const handleCampaignToggle = (campaignId: string) => {
    if (selectedCampaigns.includes(campaignId)) {
      setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaignId));
    } else {
      setSelectedCampaigns([...selectedCampaigns, campaignId]);
    }
  };

  const handleTeamMemberToggle = (memberId: string) => {
    if (selectedTeamMembers.includes(memberId)) {
      setSelectedTeamMembers(selectedTeamMembers.filter(id => id !== memberId));
    } else {
      setSelectedTeamMembers([...selectedTeamMembers, memberId]);
    }
  };

  const handlePlatformToggle = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-medium mb-3">Date Range</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "PPP")} - {format(dateRange.to, "PPP")}
                      </>
                    ) : (
                      format(dateRange.from, "PPP")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to,
                  }}
                  onSelect={(selected) => {
                    setDateRange({
                      from: selected?.from,
                      to: selected?.to,
                    });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Campaigns</h3>
            {campaignData.length > 0 ? (
              <div className="max-h-40 overflow-y-auto space-y-2">
                {campaignData.map((campaign) => (
                  <div key={campaign.id.toString()} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`campaign-${campaign.id}`} 
                      checked={selectedCampaigns.includes(campaign.id.toString())}
                      onCheckedChange={() => handleCampaignToggle(campaign.id.toString())}
                    />
                    <Label htmlFor={`campaign-${campaign.id}`} className="text-sm">
                      {campaign.name}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                No campaigns available
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Team Members</h3>
            {teamMembers.length > 0 ? (
              <div className="max-h-40 overflow-y-auto space-y-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`member-${member.id}`} 
                      checked={selectedTeamMembers.includes(member.id)}
                      onCheckedChange={() => handleTeamMemberToggle(member.id)}
                    />
                    <Label htmlFor={`member-${member.id}`} className="text-sm">
                      {member.name}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                No team members available
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Platforms</h3>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {platforms.map((platform) => (
                <div key={platform} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`platform-${platform}`} 
                    checked={selectedPlatforms.includes(platform)}
                    onCheckedChange={() => handlePlatformToggle(platform)}
                  />
                  <Label htmlFor={`platform-${platform}`} className="text-sm">
                    {platform}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsFilters;
