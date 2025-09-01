@@ .. @@
             <section className="grid gap-4 md:grid-cols-3">
-                <HighlightCard icon={MapIcon} title="Interactive Map" text="Discover global panoramic images and geotagged lessons." />
-                <HighlightCard icon={BookIcon} title="Free Lessons" text="Use community-made lessons or build your own." />
-                <HighlightCard icon={CreateIcon} title="Lesson Builder" text="Add infospots, text, and quizzes with ease." />
+                <HighlightCard icon={MapIcon} title="Interactive Map" text="Discover global panoramic images and geotagged lessons." index={0} />
+                <HighlightCard icon={BookIcon} title="Free Lessons" text="Use community-made lessons or build your own." index={1} />
+                <HighlightCard icon={CreateIcon} title="Lesson Builder" text="Add infospots, text, and quizzes with ease." index={2} />
             </section>
@@ .. @@
                 </div>
                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
-                    {MOCK_LESSONS.map((l) => <LessonCard key={l.id} lesson={l} onOpen={onOpenLesson} onNavigateToTag={(tag) => onNavigate('Lessons', { tag })} />)}
+                    {MOCK_LESSONS.map((l, index) => <LessonCard key={l.id} lesson={l} onOpen={onOpenLesson} onNavigateToTag={(tag) => onNavigate('Lessons', { tag })} index={index} />)}
                 </div>
             </section>
@@ .. @@