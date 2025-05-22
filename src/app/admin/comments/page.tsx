"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Comment {
  _id: string;
  content: string;
  author: {
    firstName: string;
    lastName: string;
  };
  post: {
    title: string;
  };
  likes: number;
  createdAt: string;
  isApproved: boolean;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get("/api/admin/comments");
      setComments(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des commentaires:", error);
      toast.error("Erreur lors du chargement des commentaires");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (
    commentId: string,
    currentStatus: boolean
  ) => {
    try {
      await axios.patch(`/api/admin/comments/${commentId}/status`, {
        isApproved: !currentStatus,
      });
      toast.success("Statut du commentaire mis à jour");
      fetchComments();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) return;

    try {
      await axios.delete(`/api/admin/comments/${commentId}`);
      toast.success("Commentaire supprimé avec succès");
      fetchComments();
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire:", error);
      toast.error("Erreur lors de la suppression du commentaire");
    }
  };

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.author.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      comment.author.lastName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      comment.post.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      comment.isApproved === (statusFilter === "approved");

    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Gestion des commentaires
        </h1>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Barre de recherche */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Rechercher un commentaire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filtre par statut */}
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="approved">Approuvé</option>
            <option value="pending">En attente</option>
          </select>
        </div>
      </div>

      {/* Liste des commentaires */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contenu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Auteur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Post
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Likes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredComments.map((comment) => (
              <tr key={comment._id}>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 line-clamp-2">
                    {comment.content}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {comment.author.firstName} {comment.author.lastName}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 line-clamp-1">
                    {comment.post.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {comment.likes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      comment.isApproved
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {comment.isApproved ? "Approuvé" : "En attente"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() =>
                        handleToggleStatus(comment._id, comment.isApproved)
                      }
                      className={`text-${
                        comment.isApproved ? "yellow" : "green"
                      }-600 hover:text-${
                        comment.isApproved ? "yellow" : "green"
                      }-900`}
                    >
                      {comment.isApproved ? "Désapprouver" : "Approuver"}
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
