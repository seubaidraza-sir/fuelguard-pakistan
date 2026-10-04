'use client';

import { useState } from 'react';
import { Mail, MapPin, MessageSquare, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setName('');
      setEmail('');
      setMessage('');
      toast.success('Message sent. We will get back to you soon.');
    }, 800);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            <Mail className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
            <p className="mt-1 text-sm text-muted-foreground">Questions, feedback, or data corrections</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/60">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">contact@fuelguard.pk</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Location</h3>
                  <p className="text-sm text-muted-foreground">Karachi, Pakistan</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Data Corrections</h3>
                  <p className="text-sm text-muted-foreground">Spot an error in our data? Let us know with the source and date.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Send a Message</CardTitle>
              <CardDescription>We typically respond within 2 business days</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1.5 block text-sm">Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" />
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-sm">Email</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <Label className="mb-1.5 block text-sm">Message</Label>
                  <Textarea value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="How can we help?" rows={5} />
                </div>
                <Button type="submit" disabled={submitting} className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
