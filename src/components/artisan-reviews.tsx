
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Star, User } from 'lucide-react';
import { Artisan } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';

const StarRatingDisplay = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn('h-5 w-5', i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground')}
        />
      ))}
    </div>
  );
};

const StarRatingInput = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => {
    const [hoverRating, setHoverRating] = useState(0);
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-8 w-8 cursor-pointer transition-colors',
              (hoverRating || rating) > i ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
            )}
            onClick={() => setRating(i + 1)}
            onMouseEnter={() => setHoverRating(i + 1)}
            onMouseLeave={() => setHoverRating(0)}
          />
        ))}
      </div>
    );
};

export function ArtisanReviews({ artisan }: { artisan: Artisan }) {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In a real app, reviews would be fetched from a DB. We use the artisan prop for now.
  const reviews = artisan.reviews || [];

  const averageRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    return { star, count, percentage: reviews.length > 0 ? (count / reviews.length) * 100 : 0 };
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating === 0 || !newTitle.trim() || !newComment.trim()) {
      toast({
        title: 'Champs Incomplets',
        description: 'Veuillez donner une note, un titre et un commentaire.',
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        setShowForm(false);
        setNewRating(0);
        setNewTitle('');
        setNewComment('');
        toast({
            title: 'Témoignage envoyé !',
            description: 'Merci pour votre retour. Il sera publié après modération.',
        });
    }, 1500);
  }

  return (
    <div id="reviews" className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Témoignages & Avis</h2>
          <p className="text-lg text-muted-foreground mt-2">
            Ce que les clients disent de {artisan.name}.
          </p>
        </div>

        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Note Globale</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-6xl font-bold">{averageRating.toFixed(1)}</p>
                    <StarRatingDisplay rating={Math.round(averageRating)} />
                    <p className="text-muted-foreground">Basé sur {reviews.length} avis</p>
                </div>
                <div className="space-y-2">
                    {ratingDistribution.map(item => (
                        <div key={item.star} className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground flex items-center gap-1 w-12">{item.star} <Star className="h-4 w-4" /></span>
                            <Progress value={item.percentage} className="flex-1 h-3" />
                            <span className="text-sm text-muted-foreground w-8 text-right">{item.count}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
        
        <div className="flex justify-end mb-6">
            <Button onClick={() => setShowForm(!showForm)} variant={showForm ? 'ghost' : 'default'}>
                {showForm ? 'Annuler' : 'Laisser un avis'}
            </Button>
        </div>
        
        {showForm && (
            <Card className="mb-8 p-6">
                <form onSubmit={handleSubmitReview} className="space-y-6">
                    <h3 className="text-xl font-headline font-semibold">Votre avis sur {artisan.name}</h3>
                    <div className="space-y-2">
                        <label className="font-medium">Votre note *</label>
                        <StarRatingInput rating={newRating} setRating={setNewRating} />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="review-title" className="font-medium">Titre de votre avis *</label>
                        <Input id="review-title" placeholder="Ex: Une expérience inoubliable" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                         <label htmlFor="review-comment" className="font-medium">Votre commentaire *</label>
                         <Textarea id="review-comment" placeholder="Parlez-nous de votre expérience..." value={newComment} onChange={(e) => setNewComment(e.target.value)} required rows={5}/>
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon avis'}
                    </Button>
                </form>
            </Card>
        )}

        <div className="space-y-6">
            {reviews.length > 0 ? reviews.map(review => (
                <Card key={review.id}>
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <Avatar>
                                <AvatarImage src={review.authorAvatar} alt={review.author} data-ai-hint="person portrait"/>
                                <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-semibold">{review.author}</p>
                                    <span className="text-sm text-muted-foreground">{format(parseISO(review.date), 'd MMMM yyyy', { locale: fr })}</span>
                                </div>
                                <StarRatingDisplay rating={review.rating}/>
                                <h4 className="font-semibold text-lg mt-3">{review.title}</h4>
                                <p className="text-muted-foreground mt-1">{review.comment}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )) : (
                <p className="text-center text-muted-foreground py-8">
                    Cet artisan n'a pas encore reçu d'avis. Soyez le premier !
                </p>
            )}
        </div>
    </div>
  )
}
