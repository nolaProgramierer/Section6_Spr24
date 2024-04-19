from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.db import IntegrityError
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from piano_inventory.serializers import PianoSerializer
from .models import User, Piano, Comment


def index(request):
    return HttpResponse("Piano inventory app working!");


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


@csrf_exempt
def piano_list(request):
    """
    List all pianos, or create a new piano.
    """
    if request.method == 'GET':
        snippets = Piano.objects.all()
        serializer = PianoSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PianoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


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
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = PianoSerializer(piano, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        piano.delete()
        return HttpResponse(status=204)


# -------------------------------------------------- #
# Class-based views
# -------------------------------------------------- #

class IndexWebpack(TemplateView):
    template_name = "piano_inventory/index_inventory.html"
