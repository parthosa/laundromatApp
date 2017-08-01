from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from .models import *
from django.contrib.admin.views.decorators import staff_member_required
import uuid
from django.http import HttpResponseRedirect,Http404,HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.sessions.models import Session
import json
import datetime

@csrf_exempt
def Register(request):
	if request.method == 'POST':
		email = json.loads(request.body)['email']
		gid = json.loads(request.body)['userId']
		request.session['email'] = email
		request.session['gid'] = gid
		registered_emails = User.objects.all().values('username')

		if email in [ x['username'] for x in registered_emails]:
			user = authenticate(username = email, password = gid)
			if user:
				user_p = UserProfile.objects.get(user = user)
				if user_p.bits_id == None:
					login(request, user)
					return JsonResponse({'status': 2, 'message': 'Successfully logged in', 'session_key': request.session.session_key})
				else:
					login(request, user)
					return JsonResponse({'status': 1, 'message': 'Successfully logged in', 'session_key': request.session.session_key})
			else:
				return JsonResponse({'status': 0})
		else:
			User.objects.create(username = email, password = gid)
			user = User.objects.get(username = email, password = gid)
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
			# user = User.objects.get(username = email)
			user_p.dp_url = json.loads(request.body)['imageUrl']
			user_p.user = user
			user_p.save()
			# hostel.user.add(user_p)
			# hostel.save()
			user_l = authenticate(username = email, password = gid)
			login(request, user_l)

			return JsonResponse({'status':2, 'message': 'User saved Successfully','session_key': request.session.session_key})

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
		user_p.room = int(req_ob['room_no'])
		# user_p.apply_date = req_ob['apply_date']
		user_p.phone = int(req_ob['phone'])
		user_p.bits_id = req_ob['bits_id']
		hostel.user.add(user_p)
		hostel.save()
		user_p.save()
		user.is_active = True
		user.save()

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
		hostel = Hostel.objects.get(short = req_ob['hostel'])
		user_p.hostel = hostel
		user_p.room = int(req_ob['room_no'])
		user_p.phone = int(req_ob['phone'])
		user_p.bits_id = req_ob['bits_id']
		user_p.save()
		return JsonResponse({'status': 1, 'message': 'Profile saved successfully'})

@csrf_exempt
def student_logout(request):
	logout(request)
	return JsonResponse({'status': 1, 'message': 'You have been successfully logged out'})


# isko dekh lena thoda...not applied cases me error aa rha hai
@csrf_exempt
def Profile(request):
	if request.method == 'POST':
		session_key = json.loads(request.body)['session_key']
		session = Session.objects.get(session_key = session_key)
		uid = session.get_decoded().get('_auth_user_id')
		user = User.objects.get(pk = uid)

		user_p = UserProfile.objects.get(user = user)
		user_data = {}
		user_data['name'] = user_p.name
		user_data['imageUrl'] = user_p.dp_url
		user_data['bits_id'] = user_p.bits_id
		user_data['phone'] = user_p.phone
		print user_p.hostel
		user_data['hostel'] = user_p.hostel.short
		user_data['room_no'] = user_p.room
		user_data['email'] = user.username
		user_data['apply_date'] = user_p.apply_date
		# if not applied uska ?
		if user_p.plan != None:
			user_data['has_applied'] = True
			user_data['plan_num'] = user_p.plan.plan_num
			user_data['with_iron'] = user_p.plan.with_iron
			user_data['washes'] = user_p.plan.washes
			print user_p.wash_history.count()
			user_data['washes_left'] = user_p.plan.washes - user_p.wash_history.count()
		else:
			user_data['has_applied'] = False

		if user_p.present_wash:
			user_data['status'] = user_p.present_wash.status.name
			user_data['date'] = user_p.present_wash.date

		return JsonResponse({'status': 1, 'user_data':user_data})

@csrf_exempt
def wash_history(request):
	if request.method == 'POST':
		req_ob = json.loads(request.body)
		session_key = req_ob['session_key']
		session = Session.objects.get(session_key = session_key)
		uid = session.get_decoded().get('_auth_user_id')
		user = User.objects.get(pk = uid)
		
		user_p = UserProfile.objects.get(user = user)
		washes = Wash.objects.filter(user=user_p).order_by('id')

		washes_list = []
		# wash_num = 1
		for wash in washes:
			washes_list.append({'number': wash.number, 'date': wash.date, 'status': wash.status.name,'status_number': wash.status.number,'with_iron':user_p.plan.with_iron})
		print washes_list
		return JsonResponse({'status': 1,'washes_list':washes_list})


@csrf_exempt
def track_status(request):
	if request.method == 'POST':
		req_ob = json.loads(request.body)
		session_key = req_ob['session_key']
		session = Session.objects.get(session_key = session_key)
		uid = session.get_decoded().get('_auth_user_id')
		user = User.objects.get(pk = uid)
		
		user_p = UserProfile.objects.get(user = user)
		present_wash = {}
		if user_p.present_wash:
			present_wash['status_number'] = user_p.present_wash.status.number
			present_wash['number'] = user_p.present_wash.number
			present_wash['date'] = user_p.present_wash.date
		present_wash['with_iron']=user_p.plan.with_iron
		return JsonResponse({'status': 1,'present_wash':present_wash})

@csrf_exempt
def signin_laundro(request):
	if request.method == 'POST':
		email = json.loads(request.body)['email']
		password = json.loads(request.body)['password']
		user = authenticate(username = email, password = password)
		if user:
			if user.is_staff:
				# user_p = UserProfile.objects.get(user = user)
				login(request,user)
				return JsonResponse({'status': 1,'message':'Login Successful'})
			else:
				return JsonResponse({'status': 0,'message':'Not Authorized'})
		else:
			return JsonResponse({'status': 0,'message':'Invalid Credentials'})


@csrf_exempt
def scan_laundro(request):
	if request.method == 'POST':
		# gid = json.loads(request.body)['uid']
		bits_id = json.loads(request.body)['bits_id']
		user_p = UserProfile.objects.get(bits_id = bits_id)
		user_data = {}
		user_data['name'] = user_p.name
		user_data['imageUrl'] = user_p.dp_url
		user_data['bits_id'] = user_p.bits_id
		user_data['phone'] = user_p.phone
		user_data['hostel'] = user_p.hostel.short
		user_data['room_no'] = user_p.room
		user_data['email'] = request.user.username
		if user_p.plan != None:
			user_data['plan_num'] = user_p.plan.plan_num
			user_data['with_iron'] = user_p.plan.with_iron
			user_data['washes'] = user_p.plan.washes
			user_data['apply_date'] = user_p.apply_date
			user_data['status_number'] = user_p.present_wash.status.number
			user_data['date'] = user_p.present_wash.date
			user_data['number'] = user_p.present_wash.number
			user_data['washes_left'] = user_p.plan.washes - user_p.wash_history.count()
		else:
			user_data['has_applied'] = False
		return JsonResponse({'status': 1, 'user_data':user_data})

# ye update nahi ho rha 
#  wash delete krne se user profile v delete ho ja rha hai
@csrf_exempt
def change_status(request):
	if request.method == 'POST':
		bits_id = json.loads(request.body)['bits_id']
		user_p = UserProfile.objects.get(bits_id = bits_id)
		status = Status.objects.get(number = json.loads(request.body)['status_number'])
		if int(json.loads(request.body)['status_number']) == 1:
			date = datetime.date.today().strftime("%d/%m/%Y")
			wash = Wash.objects.create(user = user_p, status = status, date = date)
			user_p.wash_history.add(wash)
			user_p.present_wash = wash
			user_p.save()
		else:
			user_p.present_wash.status = status
			user_p.save()
			print user_p.present_wash.status,status

		response = {'status': 1, 'message': 'Successfully updated status'}
		return JsonResponse(response)

@csrf_exempt
def get_students(request):
	if request.method == 'POST':
		hostel = Hostel.objects.get(name = json.loads(request.body)['hostel'])
		students = UserProfile.objects.filter(hostel = hostel)
		print students
		# students = hostel.user.all()
		response_list = []
		for student in students:
			if student.plan:
				response_list.append({'name': student.name, 'bits_id': student.bits_id, 'room_no': student.room,'plan': student.plan.plan_num})
			else:
				response_list.append({'name': student.name, 'bits_id': student.bits_id, 'room_no': student.room})

		return JsonResponse({'status': 1, 'students': response_list})

@csrf_exempt
def get_hostels(request):
	hostels = Hostel.objects.all()
	hostels_list = []

	for hostel in hostels:
		hostels_list.append({'name':hostel.name,'short':hostel.short})

	return JsonResponse({'status': 1, 'hostels': hostels_list})


