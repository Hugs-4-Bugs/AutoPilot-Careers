import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Search Preferences</CardTitle>
            <CardDescription>
              Define your criteria for the automated job search.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keywords">Job Title Keywords</Label>
              <Input id="keywords" defaultValue="Product Manager, UX Designer" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location Preferences</Label>
                <Input id="location" defaultValue="Remote, San Francisco, New York" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Minimum Salary Expectation (USD)</Label>
                <Input id="salary" type="number" defaultValue="120000" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="include-startups" />
              <label
                htmlFor="include-startups"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include startups (less than 50 employees)
              </label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
            <CardDescription>
              Control how AutoPilot applies to jobs on your behalf.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rate-limit">Smart Application Rate</Label>
              <Select defaultValue="balanced">
                <SelectTrigger>
                  <SelectValue placeholder="Select a rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative (~5/day)</SelectItem>
                  <SelectItem value="balanced">Balanced (~15/day)</SelectItem>
                  <SelectItem value="aggressive">Aggressive (~30/day)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Spreads applications across time to avoid spammy behavior.
              </p>
            </div>
            <div className="space-y-2">
                <Label>Browser Extension</Label>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <p className="font-medium">Chrome Extension Status</p>
                        <p className="text-sm text-muted-foreground">Connected and authorized.</p>
                    </div>
                    <Button variant="outline">Manage Sites</Button>
                </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Save Preferences</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
