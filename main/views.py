from django.shortcuts import render
from django.contrib.auth.models import User
from .models import *
from django.contrib.admin.views.decorators import staff_member_required
import uuid
from django.http import HttpResponseRedirect,Http404,HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json

def Register(request):
	if request.method == 'POST':
		email = json.loads(request.body)['email']
		gid = json.loads(request.body)['gid']
		if email in User.objects.all().values('username'):
			user = authenticate(username = email, password = gid)
			if user:
				login(request, user)
				return JsonResponse({'status': 1, 'message': 'Successfully logged in', 'session_key': session.session_key})
			else:
				return JsonResponse({'status': 0})
		else:
			User.objects.create(username = email, password = gid)
			user_p = UserProfile()
			# user_p.bits_id = json.loads(request.body)['bits_id']
			user_p.name = json.loads(request.body)['displayName']
			# hostel = Hostel.objects.get(short = json.loads(request.body)['hostel'])
			# user_p.hostel = hostel
			# user_p.room = json.loads(request.body)['room_num']
			# user_p.apply_date = json.loads(request.body)['appy_date']
			# user_p.phone = json.loads(request.body)['phone']
			user_p.uid = gid
			# user_p.dp = request.FILES['dp']
			user = User.objects.get(username = email)
			user_p.dp_url = json.loads(request.body)['imageUrl']
			user_p.save()
			# hostel.user.add(user_p)
			# hostel.save()
			user_l = authenticate(username = email, password = gid)
			login(request, user_l)

			return JsonResponse({'status':2, 'message': 'User saved Successfully'})

@csrf_exempt
def additional_info(request):
	if request.method == "POST":
		req_ob = json.loads(request.body)
		session_key = req_ob['session_key']
		session = Session.objects.get(session_key = session_key)
		uid = session.get_decoded().get('_auth_user_id')
		user = User.objects.get(pk = uid)

		user_p = UserProfile.objects.get(user = user)
		hostel = Hostel.objects.get(short = req_ob['hostel'])
		user_p.hostel = hostel
		user_p.room = req_ob['room_num']
		user_p.apply_date = req_ob['apply_date']
		user_p.phone = req_ob['phone']
		user_p.bits_id = req_ob['bits_id']
		hostel.user.add(user_p)
		hostel.save()
		user_p.save()

		return JsonResponse({'status': 1, 'message': 'Profile created successfully'})

@csrf_exempt
def edit_profile(request):
	if request.method == 'POST':
		req_ob = json.loads(request.body)
		session_key = req_ob['session_key']
		session = Session.objects.get(session_key = session_key)
		uid = session.get_decoded().get('_auth_user_id')
		user = User.objects.get(pk = uid)

		user_p = UserProfile.objects.get(user = user)
		user_p.hostel = hostel
		user_p.room = req_ob['room_num']
		user_p.phone = req_ob['phone']
		user_p.bits_id = req_ob['bits_id']

		return JsonResponse({'status': 1, 'message': 'Profile saved successfully'})

@csrf_exempt
def logout(request):
	logout(request)
	return JsonResponse({'status': 1, 'message': 'You have been successfully logged out'})


@csrf_exempt
@login_required
def Profile(request):
	if request.method == 'POST':
		session_key = json.loads(request.body)['session_key']
		session = Session.objects.get(session_key = session_key)
		uid = session.get_decoded().get('_auth_user_id')
		user = User.objects.get(pk = uid)

		user_p = UserProfile.objects.get(user = user)
		name = user_p.name
		bits_id = user_p.bits_id
		phone = user_p.phone
		hostel = user_p.hostel.short
		email = request.user.username
		plan_num = user_p.plan.plan_num
		with_iron = user_p.plan.with_iron
		apply_date = user_p.apply_date
		washes = user_p.plan.washes
		status = user_p.present_wash.status
		washes_left = user_p.plan.washes - len(user_p.wash_history)

		return JsonResponse({'status': 1, 'name': name, 'bits_id': bits_id, 'phone': phone, 'email': email, 'plan_num': plan_num, 'with_iron': with_iron, 'apply_date': apply_date, 'washes': washes, 'washes_left': washes_left, 'wash_status' :status, 'hostel': hostel})

@csrf_exempt
def wash_history(request):
	if request.method == 'POST':
		req_ob = json.loads(request.body)
		session_key = req_ob['session_key']
		session = Session.objects.get(session_key = session_key)
		uid = session.get_decoded().get('_auth_user_id')
		user = User.objects.get(pk = uid)
		
		user_p = UserProfile.objects.get(user = request.user)
		washes = Wash.objects.filter(user_p).order_by('id')

		washes_list = []
		wash_num = 1
		for wash in washes:
			washes_list.append({'number': wash_num, 'date': wash.date, 'status': wash.status.name})
		return JsonResponse(washes_list)

@csrf_exempt
@staff_member_required
def scan_laundro(self):
	if request.method == 'POST':
		gid = json.loads(request.body)['uid']
		user_p = UserProfile.objects.get(uid = gid)
		name = user_p.name
		bits_id = user_p.bits_id
		phone = user_p.phone
		email = request.user.username
		plan_num = user_p.plan.plan_num
		with_iron = user_p.plan.with_iron
		apply_date = user_p.apply_date
		washes = user_p.plan.washes
		status = user_p.present_wash.status
		washes_left = user_p.plan.washes - len(user_p.wash_history)

		return JsonResponse({'status': 1, 'name': name, 'bits_id': bits_id, 'phone': phone, 'email': email, 'plan_num': plan_num, 'with_iron': with_iron, 'apply_date': apply_date, 'washes': washes, 'washes_left': washes_left, 'status' :status})

@csrf_exempt
@staff_member_required
def change_status(self):
	if request.method == 'POST':
		bits_id = json.loads(request.body)['bits_id']
		user_p = UserProfile.objects.get(bits_id = bits_id)
		status = Status.objects.get(name = json.loads(request.body)['status'])
		if int(json.loads(request.body)['status']) == 1:
			Wash.objects.create(user = user_p, status = status, date = json.loads(request.body)['date'])
			wash = Wash.objects.get(user = user_p, date = json.loads(request.body)['date'])
			user_p.wash_history.add(wash)
			user_p.present_wash = wash
			user_p.save()
		else:
			user_p.present_wash.status = status
			user_p.save()

		response = {'status': 1, 'message': 'Successfully updated status'}
		return JsonResponse(response)

@staff_member_required
@csrf_exempt
def get_students(self):
	if request.method == 'POST':
		hostel = Hostel.objects.get(short = json.loads(request.body)['hostel'])
		students = hostel.user.all()
		response_list = []
		for student in students:
			response_list.append({'name': student.name, 'bits_id': student.bits_id, 'room_num': student.room_num, plan': student.plan.plan_num})

		return JsonResponse({'status': 1, 'students': response_list})

@staff_member_required
@csrf_exempt
def get_hostels(request):
	hostels = Hostel.objects.all()
	names = [x.short for x in hostels]

	return JsonResponse({'status': 1, 'hostels': hostels})


