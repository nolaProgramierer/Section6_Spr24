from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    
    def __str__(self):
        return self.username

  
class Piano(models.Model):
    brand = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    size = models.IntegerField(blank=True)
    imageUrl = models.URLField(max_length=200, blank=True)
    vote = models.IntegerField(blank=True, null=True, default=0)
    owner = models.ForeignKey("User", on_delete=models.CASCADE, related_name="pianos")

    def __str__(self):
        return f'${self.brand}: ${self.price}'


class Comment(models.Model):
    text = models.TextField()
    comment = models.ForeignKey("Piano", on_delete=models.CASCADE, related_name="piano_comments")
    commenter = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_comments")

    def __str__(self):
        return f'${self.text} by ${self.commenter.username}'
