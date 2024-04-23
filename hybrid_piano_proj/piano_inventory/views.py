from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.db import IntegrityError
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.contrib.auth.decorators import login_required
from django.forms import ModelForm

from piano_inventory.serializers import PianoSerializer
from .models import User, Piano


class AddPiano(ModelForm):
    class Meta:
        model = Piano
        fields = ['brand', 'price', 'size', 'imageUrl']


def index(request):
    return render(request, "piano_inventory/index.html")


def login_view(request):
    if request.method == "POST":
        # Attempt to sign user in
        username = request.POST["username"]
        # email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "piano_inventory/login.html", {
                "message": "Invalid username and/or password."})
    else:
        return render(request, "piano_inventory/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
       
        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "piano_inventory/register.html", {
                "message": "Passwords must match."
            })
        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "piano_inventory/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    return render(request, "piano_inventory/register.html")


# Django Rest Framework backend
@csrf_exempt
def piano_list(request):
    """
    List all pianos, or create a new piano.
    """
    if request.method == 'GET':
        pianos = Piano.objects.all()
        # Serialize the response with the full owner details
        serializer = PianoSerializer(pianos, many=True)
        return JsonResponse(serializer.data, safe=False) #Allows list in JSON

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PianoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        # print('Serializer error', serializer.errors)
        return JsonResponse(serializer.errors, status=400)


# Django Rest Framework backend
@csrf_exempt
def piano_detail(request, pk):
    """
    Retrieve, update or delete a piano.
    """
    try:
        piano = Piano.objects.get(pk=pk)
    except Piano.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = PianoSerializer(piano)
        piano_data = dict(serializer.data)
        piano_data["current_user_id"] = request.user.id
        
        print("Detail", piano_data)
        return JsonResponse(piano_data)
        
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        data["owner"] = request.user.id
        serializer = PianoSerializer(piano, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        # print('PUT Serializer error', serializer.errors)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        piano.delete()
        return HttpResponse(status=204)


# Create a piano object with Django form template
@login_required
def add_piano(request):
    if request.method == "POST":
        form = AddPiano(request.POST)
        if form.is_valid():
            piano_form = form.save(commit=False)
            piano_form.owner = request.user
            piano_form.save()
            return HttpResponseRedirect(reverse('index_inventory'))
    form = AddPiano()
    return render(request, 'piano_inventory/add_piano.html', {'form': form})


# -------------------------------------------------- #
# Class-based views
# -------------------------------------------------- #

class IndexWebpack(TemplateView):
    template_name = "piano_inventory/index_inventory.html"
