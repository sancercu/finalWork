from django.contrib import admin
from .models import Podcast

# Registramos el admin para el model Podcast
@admin.register(Podcast)
class PodcastAdmin(admin.ModelAdmin):
    readonly_fields = ('likes_amount',)
    list_display = ('id', 'title', 'album', 'year', 'likes_amount', 'created', 'enabled')
    search_fields = ('author', 'title', 'album')
    list_filter = ('updated', 'year')
    date_hierarchy = 'created'